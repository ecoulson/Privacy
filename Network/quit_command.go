package main

import (
	"fmt"
	"os"
)

type QuitCommand struct {

}

func NewQuitCommand() Command {
	return QuitCommand{}
}

func (command QuitCommand) Execute() {
	fmt.Println("Shutting down node...")
	os.Exit(0)
}