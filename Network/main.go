package main

import (
	"context"
	"os"
)

func main() {
	context := context.Background()
	hostNode := NewHostNode(&context)
	entries := make(chan LogEntry)
	pingProtcol := NewPingProtocol(entries)
	terminal := NewTerminal(os.Stdin, hostNode, &context, entries)

	pingProtcol.Initialize(hostNode)
	terminal.Start()
	
	hostNode.Close()
}