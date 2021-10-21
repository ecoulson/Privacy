// Author: Evan Coulson
import IFileObject from "../file/IFileObject";
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

	get files(): IFileObject[] {
		throw new Error("Method not implemented.");
	}

	addFile(file: IFileObject): void {
		throw new Error("Method not implemented.");
	}

	removeFile(path: IBucketPath): IFileObject {
		throw new Error("Method not implemented.");
	}

	getFile(path: IBucketPath): IFileObject {
		throw new Error("Method not implemented.");
	}

	equals(other: IBucket): boolean {
		return (
			this.name.value === other.name.value &&
			this.path.value === other.path.value
		);
	}
}
