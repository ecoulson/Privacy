package main

import (
	"context"

	"github.com/libp2p/go-libp2p-core/network"
)

type PingContext struct {
	stream *network.Stream
	peer *PeerNode
	context context.Context
	cancel context.CancelFunc
	responseChannel chan PingResponse
}

func NewPingContext(host IHostNode, threadContext context.Context, peer *PeerNode) *PingContext {
	stream, err := createStreamBetweenNodes(host, peer)
	pingContext, cancelFunction := context.WithCancel(threadContext)
	return &PingContext{
		peer: peer,
		stream: &stream,
		context: pingContext,
		cancel: cancelFunction,
		responseChannel: createResponseChannel(err),
	}
}

func createStreamBetweenNodes(host IHostNode, peer *PeerNode) (network.Stream, error) {
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
	return context.context.Err()
}

func (context PingContext) Done() <-chan struct{} {
	return context.context.Done()
}

func (context *PingContext) Close() {
	close(context.responseChannel)
}