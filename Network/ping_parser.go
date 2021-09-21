package main

import (
	"context"

	"github.com/libp2p/go-libp2p/p2p/protocol/ping"
)

type PingParser struct {
	host *HostNode
	context *context.Context
	pingService *ping.PingService
}

func NewPingParser(node *HostNode, context *context.Context) *PingParser {
	return &PingParser {
		host: node,
		context: context,
		pingService: ping.NewPingService(*node.host),
	}
}

func (parser PingParser) Parse(commandArguments []string) Command {
	return PingCommand {
		commandType: commandArguments[0],
		peerMultiaddress: commandArguments[1],
		numberOfPings: commandArguments[2],
		node: parser.host,
		context: *parser.context,
	}
}