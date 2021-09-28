package main

type UnknownParser struct {}

func NewUnknownCommandParser() CommandParser {
	return UnknownParser{}
}

func (parser UnknownParser) Parse(commandArguments []string) Command {
	return UnknownCommand {
		commandArguments: commandArguments,
	}
}