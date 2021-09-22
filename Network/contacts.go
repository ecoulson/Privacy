package main

import (
	"fmt"

	"github.com/libp2p/go-libp2p-core/peer"
)

type Contacts struct {
	knownAddresses []peer.AddrInfo
}

func NewContacts() *Contacts {
	return &Contacts{
		knownAddresses: make([]peer.AddrInfo, 0),
	}
}

func (contacts *Contacts) PrintContacts() {
	for i := range contacts.knownAddresses {
		fmt.Println(contacts.knownAddresses[i].String())
	}
}

func (contacts *Contacts) AddContacts(address peer.AddrInfo) {
	contacts.knownAddresses = append(contacts.knownAddresses, address)
}