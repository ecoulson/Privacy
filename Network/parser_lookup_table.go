package main

import (
	"context"
)

type ParserLookupTable map[string]CommandParser

type ParserTable struct {
	parserLookupTable ParserLookupTable
}

func (table ParserTable) Get(command string) CommandParser {
	parser, hasParser := table.parserLookupTable[command]
	if (!hasParser) {
		return UnknownParser{}
	}
	return parser
}

func (table ParserTable) Keys() []string {
	keys := make([]string, len(table.parserLookupTable))
	i := 0
	for k := range table.parserLookupTable {
		keys[i] = k
		i++
	}
	return keys
}

func NewParserLookupTable(host *HostNode, context *context.Context, entries chan LogEntry) ParserTable {
	table := make(map[string]CommandParser)
	parserTable := ParserTable {
		parserLookupTable: table,
	}
	table["ping"] = NewPingParser(host, context)
	table["whoami"] = NewWhoAmIParser(host)
	table["help"] = NewHelpParser(&parserTable)
	table["quit"] = NewQuitParser()
	table["logs"] = NewLogsParser(entries)
	return parserTable
}