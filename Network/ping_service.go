package main

import (
	"bytes"
	"context"
	"crypto/rand"
	"errors"
	"io"
	"time"

	"github.com/ecoulson/Privacy/pkg/assert"
	"github.com/libp2p/go-libp2p-core/network"
)

const PingSize = 32
const PingTimeout = time.Second * 60

type PingService struct {
	host IHostNode
	context context.Context
}

func NewPingService(command PingCommand) *PingService {
	return &PingService { 
		host: command.node, 
		context: command.context,
	}
}

func (service PingService) Ping(peer *PeerNode) <-chan PingResponse {
	assert.NotNil(peer, "Peer node can not be null")
	pingContext := NewPingContext(service.host, service.context, peer)

	go service.pingUntilContextIsClosed(pingContext)
	go service.abortPing(pingContext)

	return pingContext.responseChannel
}

func (service PingService) pingUntilContextIsClosed(context *PingContext) {
	defer context.Cancel()
	defer context.Close()

	for !service.isContextClosed(context) {
		service.makePingRequest(context)
	}
}

func (service PingService) isContextClosed(context* PingContext) bool {
	return context.Error() != nil
}

func (service PingService) makePingRequest(context *PingContext) {
	response := service.sendPingOverStream(*context.stream)
	if service.isContextClosed(context) {
		return
	}
	service.recordPingLatency(context.peer, response)

	select {
	case context.responseChannel <- *response:
	case <- context.Done():
		return
	}
}

func (service PingService) sendPingOverStream(stream network.Stream) *PingResponse {
	before := time.Now()
	pingData := service.getRandomPingData()

	writeErrorResponse := service.writePingDataToStream(stream, pingData)
	if writeErrorResponse != nil {
		return writeErrorResponse
	}

	responseData, readErrorResponse := service.readPingDataFromStream(stream)
	if readErrorResponse != nil {
		return readErrorResponse
	}

	if !bytes.Equal(pingData, responseData) {
		return CreateErrorResponse(errors.New("Ping packet does not match the response packet"))
	}
	return CreateResponse(NewClock(), before)
}

func (service PingService) getRandomPingData() []byte {
	pingData := make([]byte, PingSize)
	rand.Read(pingData)
	return pingData
}

func (service PingService) writePingDataToStream(stream network.Stream, pingData []byte) *PingResponse {
	_, err := stream.Write(pingData)
	if err == nil {
		return nil
	}
	return CreateErrorResponse(err)
}

func (service PingService) readPingDataFromStream(stream network.Stream) ([]byte, *PingResponse) {
	responseData := make([]byte, PingSize)
	_, err := io.ReadFull(stream, responseData)
	if err != nil {
		return nil, CreateErrorResponse(err)
	}
	return responseData, nil
}

func (service PingService) recordPingLatency(peer *PeerNode, result *PingResponse) {
	if result.Error() != nil {
		return
	}
	service.host.RecordLatency(peer, result.RoundTripTime())
}

func (service PingService) abortPing(context *PingContext) {
	<-context.Done()
	(*context.stream).Reset()
}