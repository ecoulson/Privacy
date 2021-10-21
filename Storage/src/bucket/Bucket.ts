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

	equals(a: IBucket, b: IBucket): boolean {
		throw new Error("Method not implemented.");
	}

	persist(): Promise<IBucket> {
		throw new Error("Method not implemented.");
	}
}
