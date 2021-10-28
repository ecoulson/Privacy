import IProcessResult from "./IProcessResult";
import ProcessError from "./ProcessError";
import ProcessId from "./ProcessId";

export default class ProcessResult implements IProcessResult {
	private _id: ProcessId;
	private _output: string;
	private _errors: ProcessError[];

	constructor(id: ProcessId, output: string, errors: ProcessError[] = []) {
		this._id = id;
		this._output = output;
		this._errors = errors;
	}

	get id(): ProcessId {
		return this._id;
	}

	get output(): string {
		return this._output;
	}

	hasErrors(): boolean {
		return this._errors.length > 0;
	}

	formatErrors(): string {
		return `Process Errors:\n${this._errors
			.map((error) => error.format())
			.join("")}`;
	}
}
