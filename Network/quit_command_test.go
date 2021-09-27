package main

import "testing"

func Test_CreateQuitCommand(t *testing.T) {
	command := NewQuitCommand()

	if command == nil {
		t.Fatal("Command should not be nil")
	}
} 

func Test_ExecuteQuitCommand(t *testing.T) {
	defer ShouldPanic("Did not quit the program", t)
	command := NewQuitCommand()

	command.Execute()
}