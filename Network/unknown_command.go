package main

import (
	"fmt"
	"strings"

	"github.com/ecoulson/Privacy/pkg/assert"
)

type UnknownCommand struct {
	commandArguments []string
}

func NewUnknownCommand(commandArguments []string) Command {
	assert.True(commandArguments != nil, "Arguments can not be nil")
	return &UnknownCommand {
		commandArguments: commandArguments,
	}
}

func (command UnknownCommand) Execute() {
	fmt.Println("Unknown command: \"" + strings.Join(command.commandArguments, " ") + "\". Type help for help ")
}