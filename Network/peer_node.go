package main

import (
	"fmt"

	"github.com/libp2p/go-libp2p-core/peer"
	"github.com/multiformats/go-multiaddr"
)

type PeerNode struct {
	address string
}

func NewPeerNode(address string) *PeerNode {
	return &PeerNode {
		address: address,
	}
}

func (node PeerNode) Id() peer.ID {
	return node.PeerInfo().ID
}

func (node PeerNode) PeerInfo() *peer.AddrInfo {
	address, err := peer.AddrInfoFromP2pAddr(node.Multiaddress()[0])
	if err != nil {
		fmt.Println("Invalid multiaddress")
	}
	return address
}

func (node PeerNode) Multiaddress() []multiaddr.Multiaddr {
	multiAddress, err := multiaddr.NewMultiaddr(node.address)
	if err != nil {
		fmt.Println("Invalid node address")
	}
	return []multiaddr.Multiaddr { multiAddress }
}