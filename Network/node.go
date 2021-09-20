package main

import (
	"github.com/libp2p/go-libp2p-core/peer"
	"github.com/multiformats/go-multiaddr"
)

type Node interface {
	Id() peer.ID
	PeerInfo() *peer.AddrInfo
	Multiaddress() []multiaddr.Multiaddr
}