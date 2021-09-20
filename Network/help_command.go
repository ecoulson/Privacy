package main

import "fmt"

type HelpCommand struct {

}

func (command HelpCommand) Execute() {
	fmt.Println("Available commands:")
	fmt.Println("ping")
	fmt.Println("help")
	fmt.Println("whoami")
}