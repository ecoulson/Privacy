package main

type LogsCommand struct {
	entries chan LogEntry
}

func NewLogsCommand(entries chan LogEntry) Command {
	return LogsCommand {
		entries: entries,
	}
}

func (command LogsCommand) Execute() {
	for entry := range command.entries {
		entry.Display()
	}
}