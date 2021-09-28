package main

import (
	"context"
	"fmt"

	"github.com/libp2p/go-libp2p"
	"github.com/libp2p/go-libp2p-core/host"
)

func CreateP2PHost(context context.Context) *host.Host {
	node, err := libp2p.New(
		context,
		libp2p.ListenAddrStrings("/ip4/127.0.0.1/tcp/0"),
		libp2p.Ping(false),
	)
	if err != nil {
		fmt.Println("Failed to create new host node")
		panic(err)
	}
	return &node
}