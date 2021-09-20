package main

import (
	"context"
	"fmt"
	"os"
)

func main() {
	context := context.Background()
	hostNode := NewHostNode(&context)
	terminal := NewTerminal(os.Stdin, hostNode, &context)

	PrintAddress(hostNode)
	terminal.Start()
	
	hostNode.Close()
}

func PrintAddress(node *HostNode) {
	address := node.Multiaddress()
	fmt.Println("libp2p node address:", address[0])
}