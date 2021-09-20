package main

import (
	"context"
	"fmt"
	"strconv"

	"github.com/libp2p/go-libp2p/p2p/protocol/ping"
)

type PingCommand struct {
	commandType string 
	args []string
	context context.Context
	node *HostNode
	pingService ping.PingService
}

func (command PingCommand) Execute() {
	fmt.Println("execute ping command")
	peerNode := NewPeerNode(command.args[0])
	ConnectNodeToPeer(command.node, command.context, peerNode)
	channel := command.pingService.Ping(command.context, peerNode.Id())
	n, err := strconv.Atoi(command.args[1])
	if err != nil {
		panic(err)
	}
	Ping(n, peerNode, channel)
}

func ConnectNodeToPeer(host *HostNode, context context.Context, peer *PeerNode) {
	if err := (*host.host).Connect(context, *peer.PeerInfo()); err != nil {
		panic(err)
	}
}

func Ping(n int, peerNode *PeerNode, channel <-chan ping.Result) {
	address := peerNode.PeerInfo()
	fmt.Println("Sending", n, "ping messages to", address)
	for i := 0; i < n; i++ {
		response := <- channel
		fmt.Println("pinged", address, "in", response.RTT)
	}
}