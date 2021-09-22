package main

import "fmt"

type Logger struct {
	entriesQueue []LogEntry
	entriesChannel chan LogEntry
}

func NewLogger() *Logger {
	return &Logger {
		entriesQueue: make([]LogEntry, 0),
		entriesChannel: make(chan LogEntry),
	}
}

func (logger *Logger) Initialize() {
	go logger.listenForEvents()
}

func (logger *Logger) listenForEvents() {
	for entry := range logger.entriesChannel {
		logger.entriesQueue = append(logger.entriesQueue, entry)
	}
}

func (logger *Logger) Log(line string) {
	logger.entriesChannel <- LogEntry { line: line }
}

func (logger *Logger) Display() {
	if len(logger.entriesQueue) == 0 {
		fmt.Println("No recent logs to display")
	}
	for i := range logger.entriesQueue {
		logger.entriesQueue[i].Display()
	}
	logger.entriesQueue = make([]LogEntry, 0)
}

