// Author: Evan Coulson
import IFileName from "../file/IFileName";
import IFilePath from "../file/IFilePath";
import BucketName from "./BucketName";

export default class StorjBucketPath implements IFilePath {
	private readonly path: string;

	constructor(name: IFileName) {
		this.path = `sj://${name.value}`;
	}

	get value(): string {
		return this.path;
	}

	get name(): IFileName {
		return new BucketName(this.value.replace("sj://", ""));
	}

	equals(other: IFilePath): boolean {
		return this.value === other.value;
	}
}
