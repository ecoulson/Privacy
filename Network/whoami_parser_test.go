package main

import "testing"

func Test_CreateWhoAmIParserWithValidNode(t *testing.T) {
	command := NewWhoAmICommand(NewFakeHostNode())

	if command == nil {
		t.Fatal("Command should not be nil")
	}
}

func Test_CreateWhoAmIParserWithNilNode(t *testing.T) {
	defer ShouldPanic("Should have paniced with nil host", t)

	NewWhoAmIParser((nil))
}

func Test_ParseWhoAmICommand(t *testing.T) {
	parser := NewWhoAmIParser(NewFakeHostNode())

	command := parser.Parse([]string { "whoami" })
	
	if command == nil {
		t.Fatal("Command should not be nil")
	}
}