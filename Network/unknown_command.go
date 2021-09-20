package main

import (
	"fmt"
	"strings"
)

type UnknownCommand struct {
	commandArgs []string
}

func (command UnknownCommand) Execute() {
	fmt.Println("Unknown command: \"" + strings.Join(command.commandArgs, " ") + "\". Type help for help ")
}