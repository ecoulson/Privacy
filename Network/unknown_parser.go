package main

type UnknownParser struct {}

func (parser UnknownParser) Parse(commandArguments []string) Command {
	return UnknownCommand {
		commandArgs: commandArguments,
	}
}