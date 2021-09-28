package main

import (
	"context"
	"os"
	"testing"
)

func ShouldPanic(message string, t* testing.T) {
	if r := recover(); r == nil {
		t.Fatal(message)
	}
}

func Test_CreateTerminal_NilInput(t *testing.T) {
	defer ShouldPanic("Should panic because of nil argument", t)

	NewTerminal(nil, NewFakeHostNode(), context.Background(), NewLogger())
}

func Test_CreateTerminal_NilHost(t *testing.T) {
	defer ShouldPanic("Should panic because of nil argument", t)

	NewTerminal(os.Stdin, nil, context.Background(), NewLogger())
}

func Test_CreateTerminal_NilContext(t *testing.T) {
	defer ShouldPanic("Should panic because of nil argument", t)

	NewTerminal(os.Stdin, NewFakeHostNode(), nil, NewLogger())
}

func Test_CreateTerminal_NilLogger(t *testing.T) {
	defer ShouldPanic("Should panic because of nil argument", t)

	NewTerminal(os.Stdin, NewFakeHostNode(), context.Background(), nil)
}