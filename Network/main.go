package main

import (
	"context"
	"os"
)

func main() {
	context := context.Background()
	hostNode := NewHostNode(&context)
	terminal := NewTerminal(os.Stdin, hostNode, &context)

	terminal.Start()
	
	hostNode.Close()
}