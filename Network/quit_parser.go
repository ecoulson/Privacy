package main

import (
	"os"

	"github.com/ecoulson/Privacy/pkg/assert"
)

type QuitParser struct {

}

func NewQuitParser() CommandParser {
	return QuitParser{}
}

func (parser QuitParser) Parse(commandArguments []string) Command {
	assert.Equal(1, len(commandArguments), "Must have exactly one argument")
	assert.Equal("quit", commandArguments[0], "First argument should be \"quit\"")

	return NewQuitCommand(parser.quitFunction)
}

func (parser QuitParser) quitFunction() {
	os.Exit(0)
}