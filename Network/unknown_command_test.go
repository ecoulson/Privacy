package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_CreateUnknownCommand(t *testing.T) {
	command := NewUnknownCommand([]string { "aaaa" })
				
	assert.NotNil(t, command, "Command should not be null")
}

func Test_CreateUnknownCommandWithNilArray(t *testing.T) {
	assert.PanicsWithValue(t, "Arguments can not be nil", func() {
		NewUnknownCommand(nil)
	})
}

func Test_ExecuteUnknownCommand(t *testing.T) {
	parser := NewUnknownCommandParser()

	command := parser.Parse([]string { "unknown" })

	command.Execute()
}