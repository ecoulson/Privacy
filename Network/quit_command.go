package main

import (
	"fmt"
	"os"
)

type QuitCommand struct {
	// TODO: consider adding a field for passing in a quit 
	// object that standardizes this process in case their 
	// are things that need to be closed
}

func NewQuitCommand() Command {
	return &QuitCommand {}
}

func (command QuitCommand) Execute() {
	fmt.Println("Shutting down node...")
	os.Exit(0)
}