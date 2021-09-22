package main

type HelpParser struct {
	parserTable *ParserTable
}

func NewHelpParser(parserTable *ParserTable) HelpParser {
	return HelpParser {
		parserTable: parserTable,
	}
}

func (parser HelpParser) Parse(commandArguments []string) Command {
	return NewHelpCommand(parser.parserTable)
}