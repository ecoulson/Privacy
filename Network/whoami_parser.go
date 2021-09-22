package main

type WhoAmIParser struct {
	node *HostNode
}

func NewWhoAmIParser(node *HostNode) CommandParser {
	return WhoAmIParser {
		node: node,
	}
}

func (parser WhoAmIParser) Parse(commandArguments []string) Command {
	return NewWhoAmICommand(parser.node)
}