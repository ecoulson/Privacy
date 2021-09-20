package main

import "fmt"

type WhoAMICommand struct {
	node *HostNode
}

func (command WhoAMICommand) Execute() {
	address := command.node.Multiaddress()
	fmt.Println(address[0])
}