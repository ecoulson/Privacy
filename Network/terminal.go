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

func NewTerminal(inputStream io.Reader, host *HostNode, context *context.Context, logger *Logger) *Terminal {
	parserTable := NewParserLookupTable(host, context, logger)
	return &Terminal {
		commandReader: NewCommandReader(inputStream, parserTable),
		host: host,
		context: context,
	}
}

func (terminal Terminal) Start() {

	terminal.printInputCharacter()
	for terminal.hasCommandToRead() {
		command := terminal.parseCommand()
		command.Execute()
		terminal.printInputCharacter()
	}
}

func (terminal Terminal) printInputCharacter() {
	fmt.Print("> ")
}

func (terminal Terminal) hasCommandToRead() bool {
	return terminal.commandReader.HasCommandToRead()
}

func (terminal Terminal) parseCommand() Command {
	return terminal.commandReader.ParseCommand(&terminal);
}