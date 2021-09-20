package main

import (
	"context"
	"fmt"
	"os"

	"github.com/libp2p/go-libp2p/p2p/protocol/ping"
)

func main() {
	context := context.Background()
	node := NewHostNode(&context)
	pingService := CreatePingService(node)
	terminal := NewTerminal(os.Stdin, node, &context, pingService)

	node.SetProtocol(ping.ID, pingService.PingHandler)

	PrintAddress(node)
	terminal.Start()
	
	node.Close()
}

func CreatePingService(node *HostNode) *ping.PingService {
	return  &ping.PingService{ Host: *node.host }
}

func PrintAddress(node *HostNode) {
	address := node.Multiaddress()
	fmt.Println("libp2p node address:", address[0])
}