package main

type LogsParser struct {
	entries chan LogEntry
}

func NewLogsParser(entries chan LogEntry) LogsParser {
	return LogsParser {
		entries: entries,
	}
}

func (parser LogsParser) Parse(commandArguments []string) Command {
	return NewLogsCommand(parser.entries)
}