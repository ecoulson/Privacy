// Author: Evan Coulson
import Assert from "../assert/Assert";
import EmptyFilePathException from "./EmptyFilePathException";
import IFilePath from "./IFilePath";

export default class FilePath implements IFilePath {
	private readonly _value: string;

	constructor(value: string) {
		Assert.notEmpty(value, new EmptyFilePathException()); 
		this._value = value;
	}

	get value(): string {
		return this._value;
	}

	equals(other: IFilePath): boolean {
		return other.value === this.value;
	}
}
