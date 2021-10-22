// Author: Evan Coulson
import IFile from "../file/IFile";
import IBucket from "./IBucket";
import IFileName from "../file/IFileName";
import IFilePath from "../file/IFilePath";
import UnknownFileException from "./UnknownFileException";

export default class Bucket implements IBucket {
	private readonly _name: IFileName;
	private readonly _path: IFilePath;
	private readonly _files: IFile[];

	constructor(name: IFileName, path: IFilePath, files?: IFile[]) {
		this._name = name;
		this._path = path;
		this._files = files || [];
	}

	get name(): IFileName {
		return this._name;
	}

	get path(): IFilePath {
		return this._path;
	}

	get files(): IFile[] {
		return this._files.map((file) => file);
	}

	addFile(file: IFile): IBucket {
		return new Bucket(this.name, this.path, [...this.files, file]);
	}

	equals(other: IBucket): boolean {
		return (
			this.name.equals(other.name) &&
			this.path.equals(other.path) &&
			this.files.length === other.files.length &&
			this._files.reduce<boolean>(
				(equal, file, i) =>
					equal &&
					file.name.equals(other.files[i].name) &&
					file.path.equals(other.files[i].path),
				true
			)
		);
	}

	getFile(path: IFilePath): IFile {
		const file = this._files.find((file) => file.path.equals(path));
		this.assertFileExists(path, file);
		return file!;
	}

	private assertFileExists(path: IFilePath, file?: IFile) {
		if (!file) {
			throw new UnknownFileException(this.name, path);
		}
	}

	updateFile(object: IFile): IBucket {
		throw new Error("Method not implemented.");
	}

	removeFile(path: IFilePath): IBucket {
		throw new Error("Method not implemented.");
	}
}
