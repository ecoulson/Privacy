package main

type HelpParser struct {

}

func NewHelpParser() HelpParser {
	return HelpParser{}
}

func (parser HelpParser) Parse(commandArguments []string) Command {
	return HelpCommand{}
}