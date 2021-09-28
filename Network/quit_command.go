package main

import (
	"fmt"

	"github.com/ecoulson/Privacy/pkg/assert"
)

type QuitCommand struct {
	quitFunction func()
}

func NewQuitCommand(quitFunction func()) Command {
	fmt.Println(quitFunction == nil)
	assert.NotNil(quitFunction, "Quit function can not be nil")

	return &QuitCommand {
		quitFunction: quitFunction,
	}
}

func (command QuitCommand) Execute() {
	fmt.Println("Shutting down node...")
	command.quitFunction()
}