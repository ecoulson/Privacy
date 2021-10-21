// Author: Evan Coulson
import IBucket from "./IBucket";
import { IBucketName } from "./IBucketName";
import IBucketPath from "./IBucketPath";

export default class Bucket implements IBucket {
	private readonly _name: IBucketName;
	private readonly _path: IBucketPath;

	constructor(name: IBucketName, path: IBucketPath) {
		this._name = name;
		this._path = path;
	}

	get name(): IBucketName {
		return this._name;
	}

	get path(): IBucketPath {
		return this._path;
	}

	equals(other: IBucket): boolean {
		return (
			this.name.value === other.name.value &&
			this.path.value === other.path.value
		);
	}

	persist(): Promise<IBucket> {
		throw new Error("Method not implemented.");
	}
}
