import IFile from "../file/IFile";
import IBucket from "./IBucket";
import IFilePath from "../file/IFilePath";
import UnknownFileException from "./UnknownFileException";
import IFileCollection from "./IFileCollection";
import FileCollection from "./FileCollection";
import StorjBucketPath from "./StorjBucketPath";
import Entity from "../entities/Entity";
import UUID from "../id/UUID";
import IFileName from "../file/IFileName";

export default class StorjBucket extends Entity implements IBucket {
	private readonly _name: IFileName;
	private readonly _path: IFilePath;
	private readonly _files: IFileCollection;

	constructor(name: IFileName, files?: IFileCollection) {
		super(new UUID());
		this._name = name;
		this._path = new StorjBucketPath(name);
		this._files = files || new FileCollection();
	}

	get name(): IFileName {
		return this._name;
	}

	get path(): IFilePath {
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

	clone(): IBucket {
		return new StorjBucket(this.name, this.files);
	}
}
