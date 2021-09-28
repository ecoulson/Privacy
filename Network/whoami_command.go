package main

import (
	"fmt"

	"github.com/ecoulson/Privacy/pkg/assert"
)

type WhoAmICommand struct {
	node IHostNode
}

func NewWhoAmICommand(node IHostNode) Command {
	assert.NotNil(node, "Host can not be nil")
	return &WhoAmICommand {
		node: node,
	}
}

func (command WhoAmICommand) Execute() {
	address := command.node.Multiaddress()
	fmt.Println(address[0])
}