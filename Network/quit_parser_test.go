package main

import "testing"

func Test_CreateQuitParser(t *testing.T) {
	parser := NewQuitParser()

	if parser == nil {
		t.Fatal("Parser should not be null")
	}
}

func Test_ParseQuitCommand(t *testing.T) {
	parser := NewQuitParser()

	command := parser.Parse([]string {"quit"})

	if command == nil {
		t.Fatal("Command should not be nil")
	}
}

func Test_ParseQuitCommandWithIncorrectCommand(t *testing.T) {
	defer ShouldPanic("Should have paniced with incorrect command type", t)
	parser := NewQuitParser()

	parser.Parse([]string {"parse"})
}

func Test_ParseQuitCommandWithNilCommand(t *testing.T) {
	defer ShouldPanic("Should have paniced due to nil array", t)
	parser := NewQuitParser()

	parser.Parse(nil)
}

func Test_ParseQuitCommandWithIncorrectArgumentsSize(t *testing.T) {
	defer ShouldPanic("Should panic due to incorrect argument size", t)
	parser := NewQuitParser()

	parser.Parse([]string {"quit", "foo"})
}