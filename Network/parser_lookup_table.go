package main

import (
	"context"
)

type ParserLookupTable map[string]CommandParser


func NewParserLookupTable(host *HostNode, context *context.Context) ParserLookupTable {
	table := make(ParserLookupTable)
	table["ping"] = NewPingParser(host, context)
	return table
}