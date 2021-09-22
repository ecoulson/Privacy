package main

type UnknownParser struct {}

func NewUnknownCommandParser() UnknownParser {
	return UnknownParser{}
}

func (parser UnknownParser) Parse(commandArguments []string) Command {
	return UnknownCommand {
		commandArguments: commandArguments,
	}
}