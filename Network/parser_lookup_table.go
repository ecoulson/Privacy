package main

import (
	"context"
)

type ParserLookupTable map[string]CommandParser


func NewParserLookupTable(host *HostNode, context *context.Context) ParserLookupTable {
	table := ParserLookupTable {
		"ping": NewPingParser(host, context),
		"help": NewHelpParser(),
		"whoami": NewWhoAMIParser(host),
	}
	return table
}