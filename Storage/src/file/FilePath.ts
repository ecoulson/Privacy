// Author: Evan Coulson
import Assert from "../assert/Assert";
import EmptyFilePathException from "./EmptyFilePathException";
import FileName from "./FileName";
import IFileName from "./IFileName";
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

	get name(): IFileName {
		return new FileName(
			this._value.substring(this._value.lastIndexOf("/") + 1)
		);
	}

	equals(other: IFilePath): boolean {
		return other.value === this.value;
	}
}
