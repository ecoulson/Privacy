import ArgumentOutOfBoundsException from "./ArgumentOutOfBoundsException";
import IArgumentList from "./IArgumentList";

export default class ArgumentList implements IArgumentList {
	private readonly _arguments: string[];

	constructor(args: string[]) {
		this._arguments = args;
	}

	getArgument(index: number): string {
		if (this._arguments.length <= index) {
			throw new ArgumentOutOfBoundsException(this._arguments, index);
		}
		return this._arguments[index];
	}

	size(): number {
		return this._arguments.length;
	}

	equals(other: IArgumentList): boolean {
		return this.size() === other.size() && this.compareValues(other);
	}

	private compareValues(other: IArgumentList): boolean {
		return this._arguments.reduce<boolean>(
			(equal, value, i) => equal && value === other.getArgument(i),
			true
		);
	}
}
