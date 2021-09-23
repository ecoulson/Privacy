package main

import (
	"io"
	"time"

	"github.com/libp2p/go-libp2p-core/network"
)

const ProtocolId = "/privacy/ping/0.0.1"

type PingProtocol struct {
	logger *Logger
}

func NewPingProtocol(logger *Logger) *PingProtocol {
	return &PingProtocol{
		logger: logger,
	}
}

func (protocol PingProtocol) Initialize(host IHostNode) {
	host.SetProtocol(ProtocolId, protocol.PingHandler)
}

func (protocol PingProtocol) PingHandler(stream network.Stream) {
	pingBuffer := make([]byte, PingSize)
	errorChannel := make(chan error, 1)
	timer := time.NewTimer(PingTimeout)

	defer close(errorChannel)
	defer timer.Stop()

	go protocol.pingTimeoutHandler(stream, timer, errorChannel)

	for {
		protocol.handlePing(stream, pingBuffer, timer, errorChannel)
	}
}

func (protocol PingProtocol) handlePing(stream network.Stream, pingBuffer []byte, timer *time.Timer, errorChannel chan error) {
	_, err := io.ReadFull(stream, pingBuffer)
	protocol.pushErrorToChannel(err, errorChannel)

	protocol.logger.Log("Pinged!")
	
	_, err = stream.Write(pingBuffer)
	protocol.pushErrorToChannel(err, errorChannel)
	timer.Reset(PingTimeout)
}

func (protocol PingProtocol) pushErrorToChannel(err error, errorChannel chan error) {
	if err != nil {
		errorChannel <- err
		return
	}
}

func (protocol PingProtocol) pingTimeoutHandler(stream network.Stream, timer *time.Timer, errorChannel chan error) {
	select {
	case <-timer.C:
		return
	case err, hasError := <- errorChannel:
		if hasError {
			protocol.logger.Log(err.Error())
		}
	}
	stream.Reset()
}