package main

import "testing"

func Test_UnkownCommand(t *testing.T) {
	parser := NewUnknownCommandParser()

	if parser == nil {
		t.Fatal("Parser can not be nil")
	}
}

func Test_ShouldParseUnknownCommand(t *testing.T) {
	parser := NewUnknownCommandParser()

	command := parser.Parse([]string { "unknown" })

	if command == nil {
		t.Fatal("Command should not be nil")
	}
}