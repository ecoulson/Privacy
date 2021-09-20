package main

import (
	"context"
	"fmt"
	"os"

	"github.com/libp2p/go-libp2p/p2p/protocol/ping"
)

func main() {
	context := context.Background()
	hostNode := NewHostNode(&context)
	pingService := CreatePingService(hostNode)
	terminal := NewTerminal(os.Stdin, hostNode, &context, pingService)

	hostNode.SetProtocol(ping.ID, pingService.PingHandler)

	PrintAddress(hostNode)
	terminal.Start()
	
	hostNode.Close()
}

func CreatePingService(node *HostNode) *ping.PingService {
	return  &ping.PingService{ Host: *node.host }
}

func PrintAddress(node *HostNode) {
	address := node.Multiaddress()
	fmt.Println("libp2p node address:", address[0])
}