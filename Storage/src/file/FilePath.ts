// Author: Evan Coulson
import IFilePath from "./IFilePath";

export default class FilePath implements IFilePath {
	constructor(value: string) {}

	get value(): string {
		throw new Error("Method not implemented.");
	}

	equals(other: IFilePath): boolean {
		throw new Error("Method not implemented.");
	}
}
