package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_CreateWhoAmIParserWithValidNode(t *testing.T) {
	command := NewWhoAmICommand(NewFakeHostNode())

	assert.NotNil(t, command, "Command should not be nil")
}

func Test_CreateWhoAmIParserWithNilNode(t *testing.T) {
	assert.PanicsWithValue(t, "Host can not be nil", func ()  {
		NewWhoAmIParser((nil))
	})
}

func Test_ParseWhoAmICommand(t *testing.T) {
	parser := NewWhoAmIParser(NewFakeHostNode())

	command := parser.Parse([]string { "whoami" })
	
	assert.NotNil(t, command, "Command should not be nil")
}