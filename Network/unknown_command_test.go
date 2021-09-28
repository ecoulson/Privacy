package main

import "testing"

func Test_CreateUnknownCommand(t *testing.T) {
	command := NewUnknownCommand([]string { "aaaa" })
				
	if command == nil {
		t.Fatal("Command should not be null")
	}
}

func Test_CreateUnknownCommandWithNilArray(t *testing.T) {
	defer ShouldPanic("Should panic with nil array", t)

	NewUnknownCommand(nil)
}

func Test_ExecuteUnknownCommand(t *testing.T) {
	parser := NewUnknownCommandParser()

	command := parser.Parse([]string { "unknown" })

	command.Execute()
}