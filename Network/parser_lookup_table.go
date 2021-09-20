package main

import (
	"context"

	"github.com/libp2p/go-libp2p/p2p/protocol/ping"
)

type ParserLookupTable map[string]CommandParser


func NewParserLookupTable(host *HostNode, context *context.Context, pingService *ping.PingService) ParserLookupTable {
	table := make(ParserLookupTable)
	table["ping"] = NewPingParser(host, context, pingService)
	return table
}