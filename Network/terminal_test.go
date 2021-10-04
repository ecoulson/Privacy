package main

import (
	"context"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_CreateTerminal_NilInput(t *testing.T) {
	assert.PanicsWithValue(t, "Input stream can not be nil", func() {
		NewTerminal(nil, NewFakeHostNode(), context.Background(), NewLogger())
	})
}

func Test_CreateTerminal_NilHost(t *testing.T) {
	assert.PanicsWithValue(t, "Host can not be nil", func() {
		NewTerminal(os.Stdin, nil, context.Background(), NewLogger())
	})
}

func Test_CreateTerminal_NilContext(t *testing.T) {
	assert.PanicsWithValue(t, "Context can not be nil", func() {
		NewTerminal(os.Stdin, NewFakeHostNode(), nil, NewLogger())
	})
}

func Test_CreateTerminal_NilLogger(t *testing.T) {
	assert.PanicsWithValue(t, "Logger can not be nil", func() {
		NewTerminal(os.Stdin, NewFakeHostNode(), context.Background(), nil)
	})
}