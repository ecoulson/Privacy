import { IFileName } from "../../src/file/IFileName";

export default class FileName implements IFileName {
	private readonly _type: string;
	private readonly _file: string;
	private readonly _value: string;

	constructor(value: string) {
		this._value = value;
		const endingDot = value.lastIndexOf(".");
		this._file = value.substring(0, endingDot);
		this._type = value.substring(endingDot + 1);
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
