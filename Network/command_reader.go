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

func (reader CommandReader) ParseCommand(terminal *Terminal) Command {
	line := reader.scanner.Text()
	return ParseCommand(line, terminal)
}

func ParseCommand(line string, terminal *Terminal) Command {
	commandArgs := strings.Split(line, " ")
	command := PingCommand {
		commandType: commandArgs[0],
		args: commandArgs[1:],
		node: terminal.host,
		context: *terminal.context,
		pingService: *terminal.pingService,
	}
	return command
}