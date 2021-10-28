import IFileName from "../../core/file/IFileName";
import IFilePath from "../../core/file/IFilePath";
import StorjBucketName from "./StorjBucketName";

export default class StorjBucketPath implements IFilePath {
	private readonly path: string;

	constructor(name: IFileName) {
		this.path = `sj://${name.value}`;
	}

	get value(): string {
		return this.path;
	}

	get name(): IFileName {
		return new StorjBucketName(this.value.replace("sj://", ""));
	}

	equals(other: IFilePath): boolean {
		return this.value === other.value;
	}
}
