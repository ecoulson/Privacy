package main

import (
	"context"
	"os"
)

func main() {
	context := context.Background()
	hostNode := NewHostNode(&context)
	pingProtcol := PingProtocol {}
	discoveryService := NewDiscoveryService(hostNode)
	terminal := NewTerminal(os.Stdin, hostNode, &context)
	
	discoveryService.Initialize()
	pingProtcol.Initialize(hostNode)
	terminal.Start()
	
	hostNode.Close()
}