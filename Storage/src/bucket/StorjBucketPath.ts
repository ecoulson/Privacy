// Author: Evan Coulson
import IFileName from "../file/IFileName";
import IFilePath from "../file/IFilePath";

export default class StorjBucketPath implements IFilePath {
	private readonly path: string;

	constructor(name: IFileName) {
		this.path = `sj://${name.value}`;
	}

	get value(): string {
		return this.path;
	}

	get name(): IFileName {
		throw new Error("Method not implemented.");
	}

	equals(other: IFilePath): boolean {
		return this.value === other.value;
	}
}
