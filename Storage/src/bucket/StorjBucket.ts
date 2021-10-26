// Author: Evan Coulson
import IFile from "../file/IFile";
import IBucket from "./IBucket";
import IFilePath from "../file/IFilePath";
import UnknownFileException from "./UnknownFileException";
import IFileCollection from "./IFileCollection";
import FileCollection from "./FileCollection";
import StorjBucketPath from "./StorjBucketPath";
import StorjBucketName from "./StorjBucketName";

export default class StorjBucket implements IBucket {
	private readonly _name: StorjBucketName;
	private readonly _path: StorjBucketPath;
	private readonly _files: IFileCollection;

	constructor(name: StorjBucketName, files?: IFileCollection) {
		this._name = name;
		this._path = new StorjBucketPath(name);
		this._files = files || new FileCollection();
	}

	get name(): StorjBucketName {
		return this._name;
	}

	get path(): StorjBucketPath {
		return this._path;
	}

	get files(): IFileCollection {
		return this._files;
	}

	addFile(file: IFile): IBucket {
		return new StorjBucket(this.name, this.files.add(file));
	}

	equals(other: IBucket): boolean {
		return (
			this.name.equals(other.name) &&
			this.path.equals(other.path) &&
			this.files.equals(other.files)
		);
	}

	getFile(path: IFilePath): IFile {
		try {
			return this.files.get(path);
		} catch (error) {
			throw new UnknownFileException(this.name, path);
		}
	}

	updateFile(path: IFilePath, file: IFile): IBucket {
		try {
			return new StorjBucket(this.name, this.files.update(path, file));
		} catch (error) {
			throw new UnknownFileException(this.name, path);
		}
	}

	removeFile(path: IFilePath): IBucket {
		try {
			return new StorjBucket(this.name, this.files.remove(path));
		} catch (error) {
			throw new UnknownFileException(this.name, path);
		}
	}
}
