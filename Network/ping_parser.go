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

func NewPingParser(host *HostNode, context *context.Context, pingService *ping.PingService) *PingParser {
	return &PingParser {
		host: host,
		context: context,
		pingService: pingService,
	}
}

func (parser PingParser) Parse(commandArguments []string) Command {
	return PingCommand {
		commandType: commandArguments[0],
		args: commandArguments[1:],
		node: parser.host,
		context: *parser.context,
		pingService: *parser.pingService,
	}
}