package main

import (
	"fmt"
	"strings"
)

type UnknownCommand struct {
	commandArguments []string
}

func NewUnknownCommand(commandArguments []string) Command {
	if commandArguments == nil {
		panic("Nil command arguments")
	}
	return &UnknownCommand {
		commandArguments: commandArguments,
	}
}

func (command UnknownCommand) Execute() {
	fmt.Println("Unknown command: \"" + strings.Join(command.commandArguments, " ") + "\". Type help for help ")
}