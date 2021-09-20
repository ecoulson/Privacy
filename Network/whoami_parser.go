package main

type WhoAMIParser struct {
	node *HostNode
}

func NewWhoAMIParser(node *HostNode) CommandParser {
	return WhoAMIParser {
		node: node,
	}
}

func (parser WhoAMIParser) Parse(commandArguments []string) Command {
	return WhoAMICommand{ node: parser.node }
}