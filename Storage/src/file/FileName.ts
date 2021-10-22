// Author: Evan Coulson
import IFileName from "./IFileName";

export default class FileName implements IFileName {
	private readonly _type: string;
	private readonly _file: string;
	private readonly _value: string;

	constructor(value: string) {
		const suffixIndex = this.getSuffixIndex(value);
		this._file = this.getFile(value, suffixIndex);
		this._type = this.getType(value, suffixIndex);
		this._value = value;
	}

	private getSuffixIndex(value: string) {
		const index = value.lastIndexOf(".");
		return index < 0 ? value.length : index;
	}

	private getFile(value: string, suffixIndex: number) {
		return value.substring(0, suffixIndex);
	}

	private getType(value: string, suffixIndex: number) {
		// add one to skip over dot character
		return value.substring(suffixIndex + 1);
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
		return this.value === other.value;
	}
}
