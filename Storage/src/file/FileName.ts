import { IFileName } from "../../src/file/IFileName";

export default class FileName implements IFileName {
	private readonly _type: string;
	private readonly _file: string;
	private readonly _value: string;

	constructor(value: string) {
		this._value = value;
		this._file = value.split(".")[0];
		this._type = value.split(".")[1];
	}

	get value(): string {
		return this._value;
	}

	get type(): string {
		return this._type;
	}

	get file(): string {
		return this._file;
	}

	equals(other: IFileName): boolean {
		throw new Error("Method not implemented.");
	}
}
