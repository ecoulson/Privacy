package main

import (
	"context"
	"fmt"
	"io"

	"github.com/ecoulson/Privacy/pkg/assert"
)

type Terminal struct {
	commandReader *CommandReader
	host *HostNode
	context *context.Context
}

func NewTerminal(inputStream io.Reader, host *HostNode, context *context.Context, logger *Logger) *Terminal {
	assert.NotNil(inputStream, "Input stream can not be nil")
	assert.NotNil(host, "Host can not be nil")
	assert.NotNil(*context, "Context can not be nil")

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