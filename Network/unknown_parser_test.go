package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_UnkownCommand(t *testing.T) {
	parser := NewUnknownCommandParser()

	assert.NotNil(t, parser, "Parser can not be nil")
}

func Test_ShouldParseUnknownCommand(t *testing.T) {
	parser := NewUnknownCommandParser()

	command := parser.Parse([]string { "unknown" })

	assert.NotNil(t, command, "Command should not be nil")
}

func Test_ShouldPanicWithNilArguments(t *testing.T) {
	assert.PanicsWithValue(t, "Arguments can not be nil", func() {
		parser := NewUnknownCommandParser()

		parser.Parse(nil)
	})
}