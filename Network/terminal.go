package main

import (
	"context"
	"fmt"
	"io"
)

type Terminal struct {
	commandReader *CommandReader
	host *HostNode
	context *context.Context
}

func NewTerminal(inputStream io.Reader, host *HostNode, context *context.Context) *Terminal {
	return &Terminal {
		commandReader: NewCommandReader(inputStream, NewParserLookupTable(host, context)),
		host: host,
		context: context,
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