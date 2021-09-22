package main

import (
	"context"
	"os"
)

func main() {
	context := context.Background()
	hostNode := NewHostNode(&context)
	pingProtcol := PingProtocol {}
	terminal := NewTerminal(os.Stdin, hostNode, &context)

	pingProtcol.Initialize(hostNode)
	terminal.Start()
	
	hostNode.Close()
}