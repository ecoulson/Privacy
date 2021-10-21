import IFilePath from "../file/IFilePath";
import BucketName from "./BucketName";

export default class StorjBucketPath implements IFilePath {
	private readonly path: string;

	constructor(name: BucketName) {
		this.path = `sj://${name.value}`;
	}

	get value(): string {
		return this.path;
	}

	equals(other: IFilePath): boolean {
		return this.value === other.value;
	}
}
