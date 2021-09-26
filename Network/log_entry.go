package main

import "fmt"

type LogEntry struct {
	line string
}

func (entry LogEntry) Display() {
	fmt.Println(entry.line)
}