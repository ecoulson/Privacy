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

type Result struct {
	RTT time.Duration
	Error error
}

func CreatePingService(command PingCommand) *PingService {
	return &PingService { 
		host: command.node, 
		context: command.context,
	}
}

func (service PingService) Ping(peer *PeerNode) <-chan Result {
	stream, err := service.CreateStream(peer)
	if err != nil {
		return CreateResponseChannelFromError(err)
	}
	pingContext, cancel := context.WithCancel(service.context)
	responseChannel := make(chan Result)

	go service.PingUntilContextIsClosed(stream, pingContext, cancel, responseChannel, peer)
	go service.AbortPing(stream, pingContext)

	return responseChannel
}

func (service PingService) CreateStream(peer *PeerNode) (network.Stream, error) {
	return service.host.NewStream(peer, ProtocolId)
}

func CreateResponseChannelFromError(err error) <-chan Result {
	channel := make(chan Result, 1)
	channel <- Result{ Error: err}
	close(channel)
	return channel
}

func (service PingService) PingUntilContextIsClosed(stream network.Stream, pingContext context.Context, cancel context.CancelFunc, responseChannel chan Result, peer *PeerNode) {
	defer close(responseChannel)
	defer cancel()

	for pingContext.Err() == nil {
		service.MakePingRequest(stream, pingContext, responseChannel, peer)
	}
}

func (service PingService) MakePingRequest(stream network.Stream, pingContext context.Context, responseChannel chan Result, peer *PeerNode) {
	response := service.SendPingOverStream(stream)
	
	if pingContext.Err() != nil {
		return
	}

	service.RecordPingLatency(peer, response)

	select {
	case responseChannel <- *response:
	case <- pingContext.Done():
		return
	}
}

func (service PingService) SendPingOverStream(stream network.Stream) *Result {
	pingData := make([]byte, PingSize)
	rand.Read(pingData)

	before := time.Now()
	_, err := stream.Write(pingData)
	if err != nil {
		return CreateErrorResponse(err)
	}

	responseData := make([]byte, PingSize)
	_, err = io.ReadFull(stream, responseData)
	if err != nil {
		return CreateErrorResponse(err)
	}

	if !bytes.Equal(pingData, responseData) {
		return CreateErrorResponse(errors.New("Ping packet does not match the response packet"))
	}
	return CreateResponse(before)
}

func CreateErrorResponse(err error) *Result {
	return &Result {
		RTT: 0,
		Error: err,
	}
}

func CreateResponse(before time.Time) *Result {
	return &Result {
		RTT: time.Since(before),
		Error: nil,
	}
}

func (service PingService) RecordPingLatency(peer *PeerNode, result *Result) {
	if result.Error != nil {
		return
	}
	(*service.host.host).Peerstore().RecordLatency(peer.Id(), result.RTT)
}

func (service PingService) AbortPing(stream network.Stream, pingContext context.Context) {
	<- pingContext.Done()
	stream.Reset()
}