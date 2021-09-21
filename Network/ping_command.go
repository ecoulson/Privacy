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
	peerNode := NewPeerNode(command.peerMultiaddress)
	command.node.Connect(peerNode)
	channel := pingService.Ping(peerNode)
	Ping(ParseNumberOfPings(command.numberOfPings), peerNode, channel)
}


func ParseNumberOfPings(rawNumberOfPings string) int {
	n, err := strconv.Atoi(rawNumberOfPings)
	if err != nil {
		panic(err)
	}
	return n
}

func Ping(n int, peerNode *PeerNode, channel <-chan Result) {
	address := peerNode.PeerInfo()
	fmt.Println("Sending", n, "ping messages to", address)
	for i := 0; i < n; i++ {
		response := <- channel
		if response.Error != nil {
			fmt.Println(response)
		}
		fmt.Println("pinged", address, "in", response.RTT.Nanoseconds())
	}
}