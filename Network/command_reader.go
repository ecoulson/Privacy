package main

import (
	"bufio"
	"io"
	"strings"
)

type CommandReader struct {
	scanner *bufio.Scanner
	parserLookupTable ParserLookupTable
}

func NewCommandReader(inputStream io.Reader, parserLookupTable ParserLookupTable) *CommandReader {
	return &CommandReader {
		scanner: bufio.NewScanner(inputStream),
		parserLookupTable: parserLookupTable,
	}
}

func (reader CommandReader) HasCommandToRead() bool {
	return reader.scanner.Scan()
}

func (reader CommandReader) ParseCommand(terminal *Terminal) Command {
	line := reader.scanner.Text()
	commandArgs := strings.Split(line, " ")
	return reader.parserLookupTable[commandArgs[0]].Parse(commandArgs)
}