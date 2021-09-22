package main

import "fmt"

type WhoAmICommand struct {
	node *HostNode
}

func NewWhoAmICommand(node *HostNode) Command {
	return WhoAmICommand {
		node: node,
	}
}

func (command WhoAmICommand) Execute() {
	address := command.node.Multiaddress()
	fmt.Println(address[0])
}