package main

import (
	"github.com/libp2p/go-libp2p-core/peer"
	"github.com/libp2p/go-libp2p/p2p/discovery/mdns"
)

type DiscoveryNotifee struct {
	host IHostNode
	contacts *Contacts
}

func NewDiscoveryNotifee(node IHostNode) *DiscoveryNotifee {
	return &DiscoveryNotifee {
		host: node,
		contacts: node.Contacts(),
	}
}

func (notifee *DiscoveryNotifee) HandlePeerFound(peerInfo peer.AddrInfo) {
	notifee.contacts.AddContacts(peerInfo)
}

type DiscoveryService struct {
	host IHostNode
	mdnsService mdns.Service
	contacts *Contacts
}

func NewDiscoveryService(node IHostNode) *DiscoveryService {
	return &DiscoveryService{
		host: node,
		contacts: node.Contacts(),
		mdnsService: mdns.NewMdnsService(*node.Host(), "example"),
	}
}

func (service *DiscoveryService) Close() error {
	return service.mdnsService.Close()
}

func (service *DiscoveryService) Initialize() {
	service.mdnsService.RegisterNotifee(NewDiscoveryNotifee(service.host))
}