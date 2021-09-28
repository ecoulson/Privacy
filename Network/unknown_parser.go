package main

import "github.com/ecoulson/Privacy/pkg/assert"

type UnknownParser struct {}

func NewUnknownCommandParser() CommandParser {
	return UnknownParser{}
}

func (parser UnknownParser) Parse(commandArguments []string) Command {
	assert.True(commandArguments != nil, "Arguments can not be nil")
	return &UnknownCommand {
		commandArguments: commandArguments,
	}
}