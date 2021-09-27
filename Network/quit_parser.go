package main

import "github.com/ecoulson/Privacy/pkg/assert"

type QuitParser struct {

}

func NewQuitParser() CommandParser {
	return QuitParser{}
}

func (parser QuitParser) Parse(commandArguments []string) Command {
	assert.NotNil(commandArguments, "Cannot parse nil arguments")
	assert.Equal("quit", commandArguments[0], "First argument should be \"quit\"")
	assert.Equal(1, len(commandArguments), "Must have exactly one argument")

	return QuitCommand{}
}