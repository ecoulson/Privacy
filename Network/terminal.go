package main

import (
	"context"
	"fmt"
	"io"

	"github.com/libp2p/go-libp2p/p2p/protocol/ping"
)

type Terminal struct {
	commandReader *CommandReader
	host *HostNode
	context *context.Context
	pingService *ping.PingService
}

func NewTerminal(inputStream io.Reader, host *HostNode, context *context.Context, pingService *ping.PingService) *Terminal {
	return &Terminal {
		commandReader: NewCommandReader(inputStream, NewParserLookupTable(host, context, pingService)),
		host: host,
		context: context,
		pingService: pingService,
	}
}

func (terminal Terminal) Start() {

	terminal.PrintInputCharacter()
	for terminal.HasCommandToRead() {
		command := terminal.ParseCommand()
		command.Execute()
		terminal.PrintInputCharacter()
	}
}

func (terminal Terminal) PrintInputCharacter() {
	fmt.Print("> ")
}

func (terminal Terminal) HasCommandToRead() bool {
	return terminal.commandReader.HasCommandToRead()
}

func (terminal Terminal) ParseCommand() Command {
	return terminal.commandReader.ParseCommand(&terminal);
}