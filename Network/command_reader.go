package main

import (
	"bufio"
	"io"
	"strings"
)

type CommandReader struct {
	scanner *bufio.Scanner
}

func NewCommandReader(inputStream io.Reader) *CommandReader {
	return &CommandReader {
		scanner: bufio.NewScanner(inputStream),
	}
}

func (reader CommandReader) HasCommandToRead() bool {
	return reader.scanner.Scan()
}

func (reader CommandReader) ParseCommand(terminal *Terminal) *PingCommand {
	line := reader.scanner.Text()
	return ParsePingCommand(line, terminal)
}

func ParsePingCommand(line string, terminal *Terminal) *PingCommand {
	commandArgs := strings.Split(line, " ")
	return &PingCommand {
		Type: commandArgs[0],
		Args: commandArgs[1:],
		Node: terminal.host,
		Context: *terminal.context,
		PingService: *terminal.pingService,
	}
}