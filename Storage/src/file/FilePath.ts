// Author: Evan Coulson
import IFilePath from "./IFilePath";

export default class FilePath implements IFilePath {
	private readonly _value: string;

	constructor(value: string) {
		if (value === "") {
			throw new Error("File path can not be empty");
		}
		this._value = value;
	}

	get value(): string {
		return this._value;
	}

	equals(other: IFilePath): boolean {
		throw new Error("Method not implemented.");
	}
}
