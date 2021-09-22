package main

import (
	"bytes"
	"context"
	"crypto/rand"
	"errors"
	"io"
	"time"

	"github.com/libp2p/go-libp2p-core/network"
)

const PingSize = 32
const PingTimeout = time.Second * 60

type PingService struct {
	host *HostNode
	context context.Context
}

func CreatePingService(command PingCommand) *PingService {
	return &PingService { 
		host: command.node, 
		context: command.context,
	}
}

func (service PingService) Ping(peer *PeerNode) <-chan PingResponse {
	context := NewPingContext(service.host, &service.context, peer)

	go service.PingUntilContextIsClosed(context)
	go service.AbortPing(context)

	return context.responseChannel
}

func (service PingService) PingUntilContextIsClosed(context *PingContext) {
	defer close(context.responseChannel)
	defer context.Cancel()

	for !service.IsContextClosed(context) {
		service.MakePingRequest(context)
	}
}

func (service PingService) IsContextClosed(context* PingContext) bool {
	return context.Error() != nil
}

func (service PingService) MakePingRequest(context *PingContext) {
	response := service.SendPingOverStream(*context.stream)
	if service.IsContextClosed(context) {
		return
	}
	service.RecordPingLatency(context.peer, response)

	select {
	case context.responseChannel <- *response:
	case <- context.Done():
		return
	}
}

func (service PingService) SendPingOverStream(stream network.Stream) *PingResponse {
	before := time.Now()
	pingData := service.GetRandomPingData()

	writeErrorResponse := service.WritePingDataToStream(stream, pingData)
	if writeErrorResponse != nil {
		return writeErrorResponse
	}

	responseData, readErrorResponse := service.ReadPingDataFromStream(stream)
	if readErrorResponse != nil {
		return readErrorResponse
	}

	if !bytes.Equal(pingData, responseData) {
		return CreateErrorResponse(errors.New("Ping packet does not match the response packet"))
	}
	return CreateResponse(before)
}

func (service PingService) GetRandomPingData() []byte {
	pingData := make([]byte, PingSize)
	rand.Read(pingData)
	return pingData
}

func (service PingService) WritePingDataToStream(stream network.Stream, pingData []byte) *PingResponse {
	_, err := stream.Write(pingData)
	if err == nil {
		return nil
	}
	return CreateErrorResponse(err)
}

func (service PingService) ReadPingDataFromStream(stream network.Stream) ([]byte, *PingResponse) {
	responseData := make([]byte, PingSize)
	_, err := io.ReadFull(stream, responseData)
	if err != nil {
		return nil, CreateErrorResponse(err)
	}
	return responseData, nil
}

func (service PingService) RecordPingLatency(peer *PeerNode, result *PingResponse) {
	if result.Error() != nil {
		return
	}
	service.host.RecordLatency(peer, result.RoundTripTime())
}

func (service PingService) AbortPing(context *PingContext) {
	<- (*context.pingContext).Done()
	(*context.stream).Reset()
}