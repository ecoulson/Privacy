package main

import (
	"context"

	"github.com/libp2p/go-libp2p-core/host"
	"github.com/libp2p/go-libp2p-core/network"
	"github.com/libp2p/go-libp2p-core/peer"
	"github.com/libp2p/go-libp2p-core/protocol"
	"github.com/multiformats/go-multiaddr"
)

type HostNode struct {
	host *host.Host
	context *context.Context
}

func NewHostNode(context *context.Context) *HostNode {
	return &HostNode {
		host: CreateP2PHost(context),
		context: context,
	}
}

func (node HostNode) Id() peer.ID {
	return node.PeerInfo().ID
}

func (node HostNode) PeerInfo() *peer.AddrInfo {
	return &peer.AddrInfo {
		ID: (*node.host).ID(),
		Addrs: (*node.host).Addrs(),
	}
}

func (node HostNode) Multiaddress() []multiaddr.Multiaddr {
	address, err := peer.AddrInfoToP2pAddrs(node.PeerInfo())
	if err != nil {
		panic(err)
	}
	return address
}

func (node HostNode) SetProtocol(protocolId protocol.ID, handler func (s network.Stream)) {
	(*node.host).SetStreamHandler(protocolId, handler)
}

func (node HostNode) Close() {
	if err := (*node.host).Close(); err != nil {
		panic(err)
	}
}

func (node HostNode) Connect(peer *PeerNode) {
	if err := (*node.host).Connect(*node.context, *peer.PeerInfo()); err != nil {
		panic(err)
	}
}

func (node HostNode) NewStream(peer *PeerNode, protocolId protocol.ID) (network.Stream, error) {
	return (*node.host).NewStream(*node.context, peer.Id(), protocolId)
}