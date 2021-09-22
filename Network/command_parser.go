package main

type CommandParser interface {
	Parse(commandArguments []string) Command
}