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
	terminal := NewTerminal(os.Stdin, hostNode, &context, logger)

	logger.Initialize()
	pingProtcol.Initialize(hostNode)
	terminal.Start()
	
	hostNode.Close()
}