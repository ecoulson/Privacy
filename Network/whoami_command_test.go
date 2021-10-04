package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_CreateWhoAmICommandWithValidHostNode(t *testing.T) {
	command := NewWhoAmICommand(NewFakeHostNode())

	assert.NotNil(t, command, "Command must not be nil")
}

func Test_CreateCommandWithNilHostNode(t *testing.T) {
	assert.PanicsWithValue(t, "Host can not be nil", func() {
		NewWhoAmICommand(nil)
	})
}

func Test_ExecuteWhoAmICommand(t *testing.T) {
	command := NewWhoAmICommand(NewFakeHostNode())

	command.Execute()
}