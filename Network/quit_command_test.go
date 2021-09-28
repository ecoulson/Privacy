package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_CreateQuitCommand(t *testing.T) {
	command := NewQuitCommand(func() {})

	assert.NotNil(t, command, "Command should not be nil")
} 
func Test_ExecuteQuitCommand(t *testing.T) {
	command := NewQuitCommand(func() {})

	command.Execute()
}
