package main

import (
	"github.com/libp2p/go-libp2p-core/peer"
	"github.com/libp2p/go-libp2p/p2p/discovery/mdns"
)

type DiscoveryNotifee struct {
	host *HostNode
	contacts *Contacts
}

func NewDiscoveryNotifee(node *HostNode) *DiscoveryNotifee {
	return &DiscoveryNotifee {
		host: node,
		contacts: node.Contacts(),
	}
}

func (notifee *DiscoveryNotifee) HandlePeerFound(peerInfo peer.AddrInfo) {
	notifee.contacts.AddContacts(peerInfo)
}

type DiscoveryService struct {
	host *HostNode
	mdnsService mdns.Service
	contacts *Contacts
}

func NewDiscoveryService(node *HostNode) *DiscoveryService {
	return &DiscoveryService{
		host: node,
		contacts: node.contacts,
		mdnsService: mdns.NewMdnsService(*node.host, "example"),
	}
}

func (service *DiscoveryService) Close() error {
	return service.mdnsService.Close()
}

func (service *DiscoveryService) Initialize() {
	service.mdnsService.RegisterNotifee(NewDiscoveryNotifee(service.host))
}