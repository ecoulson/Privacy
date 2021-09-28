package main

import "testing"

func Test_CreateWhoAmICommandWithValidHostNode(t *testing.T) {
	command := NewWhoAmICommand(NewFakeHostNode())

	if command == nil {
		t.Fatal("Command must not be nil")
	}
}

func Test_CreateCommandWithNilHostNode(t *testing.T) {
	defer ShouldPanic("Nil host node should panic", t)

	NewWhoAmICommand(nil)
}

func Test_ExecuteWhoAmICommand(t *testing.T) {
	command := NewWhoAmICommand(NewFakeHostNode())

	command.Execute()
}