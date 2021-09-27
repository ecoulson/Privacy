package main

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/libp2p/go-libp2p-core/host"
	"github.com/libp2p/go-libp2p-core/mux"
	"github.com/libp2p/go-libp2p-core/network"
	"github.com/libp2p/go-libp2p-core/peer"
	"github.com/libp2p/go-libp2p-core/protocol"
	"github.com/multiformats/go-multiaddr"
)

type FakeNetworkStream struct {
	mux.MuxedStream
}

func (stream FakeNetworkStream) ID() string {
	return ""
}

func (stream FakeNetworkStream) Protocol() protocol.ID {
	return ""
}

func (stream FakeNetworkStream) SetProtocol(id protocol.ID) {
	
}

func (stream FakeNetworkStream) Stat() network.Stat {
	return network.Stat{}
}

func (stream FakeNetworkStream) Conn() network.Conn {
	return nil
}

func (stream FakeNetworkStream) Reset() error {
	return nil
}

func (stream FakeNetworkStream) Write(p []byte) (int, error) {
	return 0, nil
}

func (stream FakeNetworkStream) Read(p []byte) (int, error) {
	return 0, nil
}

type FakeHostNode struct {}

const FakeNodeAddress = "/ip4/127.0.0.1/tcp/56002/p2p/QmXxBMHw3HGRVfgH8TBKsgeQmDZ2BtmWsLzrfDKF1jw9Kk"
const FakeNodeId = "QmXxBMHw3HGRVfgH8TBKsgeQmDZ2BtmWsLzrfDKF1jw9Kk"

func NewFakeHostNode() IHostNode {
	return FakeHostNode{}
}

func (node FakeHostNode) Id() peer.ID {
	return node.PeerInfo().ID
}

func (node FakeHostNode) PeerInfo() *peer.AddrInfo {
	address, _ := multiaddr.NewMultiaddr(FakeNodeAddress)
	return &peer.AddrInfo {
		ID: FakeNodeId,
		Addrs: []multiaddr.Multiaddr { address },
	}
}

func (node FakeHostNode) Multiaddress() []multiaddr.Multiaddr {
	address, _ := multiaddr.NewMultiaddr(FakeNodeAddress)
	return []multiaddr.Multiaddr { address }
}

func (node FakeHostNode) Host() *host.Host {
	return nil
}

func (node FakeHostNode) Contacts() *Contacts {
	return nil
}

func (node FakeHostNode) SetProtocol(protocolId protocol.ID, handler func (s network.Stream)) {}

func (node FakeHostNode) RecordLatency(peer *PeerNode, roundTripTime time.Duration) {}

func (node FakeHostNode) Close() {}

func (node FakeHostNode) Connect(peer *PeerNode) {}

func (node FakeHostNode) NewStream(peer *PeerNode, protocolId protocol.ID) (network.Stream, error) {
	return FakeNetworkStream {}, errors.New("error")
}

func Test_CreatePingService_ShouldCreatePingService(t *testing.T) {
	command := NewPingCommand(NewPingParser(FakeHostNode{}, context.Background()), []string {
		"ping", "address", "2",
	})

	service := NewPingService(command.(PingCommand))

	if (service == nil) {
		t.Fatal("Service can not be null")
	}
}

func Test_PingService_PingService(t *testing.T) {
	command := NewPingCommand(NewPingParser(FakeHostNode{}, context.Background()), []string {
		"ping", "address", "2",
	})
	service := NewPingService(command.(PingCommand))
	
	responseChannel := service.Ping(NewPeerNode(FakeNodeAddress))

	if (responseChannel == nil) {
		t.Fatal("Response channel can not be created")
	}
}