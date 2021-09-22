package main

type LogsCommand struct {
	logger *Logger
}

func NewLogsCommand(logger *Logger) Command {
	return LogsCommand {
		logger: logger,
	}
}

func (command LogsCommand) Execute() {
	command.logger.Display()
}