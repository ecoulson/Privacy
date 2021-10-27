//Author: Evan Coulson
import IFile from "./IFile";
import IFileName from "./IFileName";
import IFilePath from "./IFilePath";

export default class File implements IFile {
	private readonly _path: IFilePath;
	private readonly _name: IFileName;

	constructor(path: IFilePath) {
		this._path = path;
		this._name = path.name;
	}

	get name(): IFileName {
		return this._name;
	}

	get path(): IFilePath {
		return this._path;
	}

	equals(other: IFile): boolean {
		return this.name.equals(other.name) && this.path.equals(other.path);
	}
}
