package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_CreateQuitParser(t *testing.T) {
	parser := NewQuitParser()

	assert.NotNil(t, parser, "Parser should not be nil")
}

func Test_ParseQuitCommand(t *testing.T) {
	parser := NewQuitParser()

	command := parser.Parse([]string {"quit"})

	assert.NotNil(t, command, "Command should not be nil")
}

func Test_ParseQuitCommandWithIncorrectCommand(t *testing.T) {
	assert.PanicsWithValue(t, "First argument should be \"quit\"", func() {
		parser := NewQuitParser()

		parser.Parse([]string {"parse"})
	})
}

func Test_ParseQuitCommandWithIncorrectArgumentsSize(t *testing.T) {
	assert.PanicsWithValue(t, "Must have exactly one argument", func() {
		parser := NewQuitParser()

		parser.Parse([]string {"quit", "foo"})
	})

	assert.PanicsWithValue(t, "Must have exactly one argument", func() {
		parser := NewQuitParser()

		parser.Parse([]string {})
	})

	assert.PanicsWithValue(t, "Must have exactly one argument", func() {
		parser := NewQuitParser()

		parser.Parse(make([]string, 0))
	})

	assert.PanicsWithValue(t, "Must have exactly one argument", func() {
		parser := NewQuitParser()

		parser.Parse(nil)
	})
}