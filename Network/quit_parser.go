package main

type QuitParser struct {

}

func NewQuitParser() CommandParser {
	return QuitParser{}
}

func (parser QuitParser) Parse([]string) Command {
	return QuitCommand{}
}