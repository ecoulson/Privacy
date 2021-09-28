package main

import (
	"context"
)

type PingParser struct {
	node IHostNode
	context context.Context
}

func NewPingParser(node IHostNode, context context.Context) *PingParser {
	return &PingParser {
		node: node,
		context: context,
	}
}

func (parser *PingParser) Parse(commandArguments []string) Command {
	return NewPingCommand(parser, commandArguments)
}