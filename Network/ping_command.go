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

func (command PingCommand) Execute() {
	pingService := CreatePingService(command)
	peerNode := command.GetPeerNode()
	command.ConnectHostNodeToPeerNode(peerNode)
	responseChannel := pingService.Ping(peerNode)
	command.Ping(peerNode, responseChannel)
}

func (command PingCommand) GetPeerNode() *PeerNode {
	return NewPeerNode(command.peerMultiaddress)
}

func (command PingCommand) ConnectHostNodeToPeerNode(peerNode *PeerNode) {
	command.node.Connect(peerNode)
}

func (command PingCommand) ParseNumberOfPings() int {
	n, err := strconv.Atoi(command.numberOfPings)
	if err != nil {
		panic(err)
	}
	return n
}

func (command PingCommand) Ping(peerNode *PeerNode, channel <-chan PingResponse) {
	address := peerNode.PeerInfo()
	n := command.ParseNumberOfPings()
	fmt.Println("Sending", n, "ping messages to", address)
	for i := 0; i < n; i++ {
		response := <- channel
		if response.Error != nil {
			fmt.Println(response.Error)
		} else {
			fmt.Println("pinged", address, "in", response.RoundTripTime)
		}
	}
}