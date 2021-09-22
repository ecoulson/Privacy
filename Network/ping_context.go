package main

import (
	"context"

	"github.com/libp2p/go-libp2p-core/network"
)

type PingContext struct {
	stream *network.Stream
	threadContext *context.Context
	peer *PeerNode
	pingContext *context.Context
	cancel context.CancelFunc
	responseChannel chan PingResponse
}

func NewPingContext(host *HostNode, threadContext *context.Context, peer *PeerNode) *PingContext {
	stream, err := CreateStreamBetweenNodes(host, peer)
	pingContext, cancelFunction := context.WithCancel(*threadContext)
	return &PingContext{
		threadContext: threadContext,
		peer: peer,
		stream: &stream,
		pingContext: &pingContext,
		cancel: cancelFunction,
		responseChannel: CreateResponseChannel(err),
	}
}

func (context PingContext) Cancel() {
	context.cancel()
}

func (context PingContext) Error() error {
	return (*context.pingContext).Err()
}

func (context PingContext) Done() <-chan struct{} {
	return (*context.pingContext).Done()
}

func CreateStreamBetweenNodes(host *HostNode, peer *PeerNode) (network.Stream, error) {
	return host.NewStream(peer, ProtocolId)
}

func CreateResponseChannel(err error) chan PingResponse {
	if err != nil {
		return CreateResponseChannelFromError(err)
	}
	return make(chan PingResponse)
}

func CreateResponseChannelFromError(err error) chan PingResponse {
	channel := make(chan PingResponse, 1)
	channel <- *CreateErrorResponse(err)
	close(channel)
	return channel
}
