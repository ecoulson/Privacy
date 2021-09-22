package main

import (
	"fmt"
	"os"
)

type QuitCommand struct {

}

func (command QuitCommand) Execute() {
	fmt.Println("Shutting down node...")
	os.Exit(0)
}