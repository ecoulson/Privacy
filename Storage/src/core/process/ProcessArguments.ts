import IArgumentList from "./IArgumentList";
import IProcessArguments from "./IProcessArguments";

export default class ProcessArguments implements IProcessArguments {
	private readonly _command: string;
	private readonly _arguments: IArgumentList;

	constructor(command: string, argumentList: IArgumentList) {
		this._command = command;
		this._arguments = argumentList;
	}

	get command(): string {
		return this._command;
	}

	get arguments(): IArgumentList {
		return this._arguments;
	}

	equals(other: IProcessArguments): boolean {
		return (
			this.command === other.command &&
			this.arguments.equals(other.arguments)
		);
	}
}
