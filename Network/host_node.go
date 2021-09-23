package main

import (
	"context"
	"time"

	"github.com/libp2p/go-libp2p-core/host"
	"github.com/libp2p/go-libp2p-core/network"
	"github.com/libp2p/go-libp2p-core/peer"
	"github.com/libp2p/go-libp2p-core/protocol"
	"github.com/multiformats/go-multiaddr"
)

type IHostNode interface {
	Id() peer.ID
	PeerInfo() *peer.AddrInfo
	Connect(peer *PeerNode)
	Multiaddress() []multiaddr.Multiaddr
	Close()
	NewStream(peer *PeerNode, protocolId protocol.ID) (network.Stream, error)
	RecordLatency(peer *PeerNode, roundTripTime time.Duration)
	SetProtocol(protocolId protocol.ID, handler func (s network.Stream))
	Contacts() *Contacts
	Host() *host.Host
}

type HostNode struct {
	host *host.Host
	context context.Context
	contacts *Contacts
}

func NewHostNode(context context.Context) IHostNode {
	return &HostNode {
		host: CreateP2PHost(context),
		context: context,
		contacts: NewContacts(),
	}
}

func (node *HostNode) Host() *host.Host {
	return node.host
}

func (node *HostNode) Contacts() *Contacts {
	return node.contacts
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

func (node HostNode) RecordLatency(peer *PeerNode, roundTripTime time.Duration) {
	(*node.host).Peerstore().RecordLatency(peer.Id(), roundTripTime)
}

func (node HostNode) Close() {
	if err := (*node.host).Close(); err != nil {
		panic(err)
	}
}

func (node HostNode) Connect(peer *PeerNode) {
	if err := (*node.host).Connect(node.context, *peer.PeerInfo()); err != nil {
		panic(err)
	}
}

func (node HostNode) NewStream(peer *PeerNode, protocolId protocol.ID) (network.Stream, error) {
	return (*node.host).NewStream(node.context, peer.Id(), protocolId)
}