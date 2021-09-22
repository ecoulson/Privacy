package main

import (
	"errors"
	"fmt"
)

type WhoAmICommand struct {
	node *HostNode
}

func NewWhoAmICommand(node *HostNode) Command {
	if node == nil {
		panic(errors.New("host node can not be nil"))
	}
	return WhoAmICommand {
		node: node,
	}
}

func (command WhoAmICommand) Execute() {
	address := command.node.Multiaddress()
	fmt.Println(address[0])
}