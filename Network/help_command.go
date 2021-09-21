package main

import "fmt"

type HelpCommand struct {
	parserTable ParserTable
}

func (command HelpCommand) Execute() {
	fmt.Println("Available commands are:")
	keys := command.parserTable.Keys()
	for i := range keys {
		fmt.Println(keys[i])
	}
}