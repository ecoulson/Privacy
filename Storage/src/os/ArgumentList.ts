import IArgumentList from "./IArgumentList";

export default class ArgumentList implements IArgumentList {
	getArgument(index: number): string {
		throw new Error("Method not implemented.");
	}

	size(): number {
		throw new Error("Method not implemented.");
	}

	equals(other: IArgumentList): boolean {
		return true;
	}
}
