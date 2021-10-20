import { IBucketName } from "./IBucketName";
import IBucketPath from "./IBucketPath";

export default class StorjBucketPath implements IBucketPath {
	private readonly path: string;

	constructor(name: IBucketName) {
		this.path = `sj://${name.value}`;
	}

	get value(): string {
		return this.path;
	}
}
