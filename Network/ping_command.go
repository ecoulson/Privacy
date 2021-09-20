package main

import (
	"context"
	"fmt"
	"strconv"

	"github.com/libp2p/go-libp2p/p2p/protocol/ping"
)

type PingCommand struct {
	Type string 
	Args []string
	Context context.Context
	Node *HostNode
	PingService ping.PingService
}

func (command PingCommand) Execute() {
	fmt.Println("execute ping command")
	peerNode := NewPeerNode(command.Args[0])
	ConnectNodeToPeer(command.Node, command.Context, peerNode)
	channel := command.PingService.Ping(command.Context, peerNode.Id())
	n, err := strconv.Atoi(command.Args[1])
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