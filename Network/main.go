package main

import (
	"context"
	"os"
)

func main() {
	context := context.Background()
	hostNode := NewHostNode(&context)
	logger := NewLogger()
	pingProtcol := NewPingProtocol(logger)
	discoveryService := NewDiscoveryService(hostNode)
	terminal := NewTerminal(os.Stdin, hostNode, &context, logger)
	
	discoveryService.Initialize()
	logger.Initialize()
	pingProtcol.Initialize(hostNode)
	terminal.Start()
	
	hostNode.Close()
}