package main

import (
	"bufio"
	"io"
	"strings"
)

type CommandReader struct {
	scanner *bufio.Scanner
	parserLookupTable ParserTable
}

func NewCommandReader(inputStream io.Reader, parserTable ParserTable) *CommandReader {
	return &CommandReader {
		scanner: bufio.NewScanner(inputStream),
		parserLookupTable: parserTable,
	}
}

func (reader CommandReader) HasCommandToRead() bool {
	return reader.scanner.Scan()
}

func (reader CommandReader) ParseCommand(terminal *Terminal) Command {
	commandArgs := reader.readCommandArguments()
	commandParser := reader.getParser(commandArgs[0])
	return commandParser.Parse(commandArgs)
}

func (reader CommandReader) readCommandArguments() []string {
	line := reader.scanner.Text()
	return strings.Split(line, " ")
}

func (reader CommandReader) getParser(command string) CommandParser {
	return reader.parserLookupTable.Get(command)
}