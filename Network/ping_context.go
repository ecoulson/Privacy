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
	stream, err := createStreamBetweenNodes(host, peer)
	pingContext, cancelFunction := context.WithCancel(*threadContext)
	return &PingContext{
		threadContext: threadContext,
		peer: peer,
		stream: &stream,
		pingContext: &pingContext,
		cancel: cancelFunction,
		responseChannel: createResponseChannel(err),
	}
}

func createStreamBetweenNodes(host *HostNode, peer *PeerNode) (network.Stream, error) {
	return host.NewStream(peer, ProtocolId)
}

func createResponseChannel(err error) chan PingResponse {
	if err != nil {
		return createResponseChannelFromError(err)
	}
	return make(chan PingResponse)
}

func createResponseChannelFromError(err error) chan PingResponse {
	channel := make(chan PingResponse, 1)
	channel <- *CreateErrorResponse(err)
	close(channel)
	return channel
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
