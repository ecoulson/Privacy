package main

import "github.com/ecoulson/Privacy/pkg/assert"

type QuitParser struct {

}

func NewQuitParser() CommandParser {
	return QuitParser{}
}

func (parser QuitParser) Parse(arguments []string) Command {
	assert.NotNil(arguments, "Arguments can not be null")
	assert.Equal("quit", arguments[0], "First argument must be 'quit'")
	return NewQuitCommand()
}