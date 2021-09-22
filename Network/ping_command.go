package main

import (
	"context"
	"fmt"
	"strconv"
)

type PingCommand struct {
	commandType string 
	peerMultiaddress string
	numberOfPings string
	context context.Context
	node *HostNode
}

func NewPingCommand(parser *PingParser, commandArguments []string ) Command {
	return PingCommand {
		commandType: commandArguments[0],
		peerMultiaddress: commandArguments[1],
		numberOfPings: commandArguments[2],
		node: parser.host,
		context: *parser.context,
	}
}

func (command PingCommand) Execute() {
	pingService := CreatePingService(command)
	peerNode := command.getPeerNode()
	command.connectHostNodeToPeerNode(peerNode)
	responseChannel := pingService.Ping(peerNode)
	command.ping(peerNode, responseChannel)
}

func (command PingCommand) getPeerNode() *PeerNode {
	return NewPeerNode(command.peerMultiaddress)
}

func (command PingCommand) connectHostNodeToPeerNode(peerNode *PeerNode) {
	command.node.Connect(peerNode)
}

func (command PingCommand) parseNumberOfPings() int {
	n, err := strconv.Atoi(command.numberOfPings)
	if err != nil {
		panic(err)
	}
	return n
}

func (command PingCommand) ping(peerNode *PeerNode, channel <-chan PingResponse) {
	address := peerNode.PeerInfo()
	n := command.parseNumberOfPings()
	fmt.Println("Sending", n, "ping messages to", address)
	for i := 0; i < n; i++ {
		response := <- channel
		if response.HasError() {
			fmt.Println(response.Error())
		} else {
			fmt.Println("pinged", address, "in", response.RoundTripTime())
		}
	}
}