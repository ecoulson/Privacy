package main

import (
	"github.com/ecoulson/Privacy/pkg/assert"
)

type WhoAmIParser struct {
	node IHostNode
}

func NewWhoAmIParser(node IHostNode) CommandParser {
	assert.NotNil(node, "Host can not be nil")
	return &WhoAmIParser {
		node: node,
	}
}

func (parser WhoAmIParser) Parse(arguments []string) Command {
	assert.IsGreater(len(arguments), 0, "must have more than 0 arguments")
	assert.Equal("whoami", arguments[0], "first argument must be 'whoami'")
	return NewWhoAmICommand(parser.node)
}