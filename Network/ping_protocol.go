package main

import (
	"fmt"
	"io"
	"time"

	"github.com/libp2p/go-libp2p-core/network"
)

const ProtocolId = "/privacy/ping/0.0.1"

type PingProtocol struct {
	entries chan LogEntry
}

func NewPingProtocol(entries chan LogEntry) *PingProtocol {
	return &PingProtocol{
		entries: entries,
	}
}

func (protocol PingProtocol) Initialize(host *HostNode) {
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

	go func() {
		protocol.entries <- LogEntry{ line: "Pinged!" }
	}()
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
		fmt.Println("ping timeout")
	case err, hasError := <- errorChannel:
		if hasError {
			fmt.Println(err)
		} else {
			fmt.Println("ping loop failed without error")
		}
	}
	stream.Reset()
}