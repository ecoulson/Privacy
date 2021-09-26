package main

type LogsParser struct {
	logger *Logger
}

func NewLogsParser(logger *Logger) LogsParser {
	return LogsParser {
		logger: logger,
	}
}

func (parser LogsParser) Parse(commandArguments []string) Command {
	return NewLogsCommand(parser.logger)
}