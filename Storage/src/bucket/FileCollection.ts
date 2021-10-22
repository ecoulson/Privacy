// Author: Evan Coulson
import Assert from "../assert/Assert";
import IFile from "../file/IFile";
import IFilePath from "../file/IFilePath";
import IFileCollection from "./IFileCollection";
import UnknownFileCollectionKey from "./UnknownFileCollectionKey";

export default class FileCollection implements IFileCollection {
	private readonly _files: IFile[];

	constructor(files?: IFile[]) {
		this._files = files || [];
	}

	add(file: IFile): IFileCollection {
		return new FileCollection([...this._files, file]);
	}

	delete(key: IFilePath): IFileCollection {
		throw new Error("Method not implemented.");
	}

	has(key: IFilePath): boolean {
		return this._files.some((file) => file.path.equals(key));
	}

	get(key: IFilePath): IFile {
		Assert.true(this.has(key), new UnknownFileCollectionKey(key));
		return this._files.find((file) => file.path.equals(key))!;
	}

	size(): number {
		return this._files.length;
	}

	update(file: IFile): IFileCollection {
		throw new Error("Method not implemented.");
	}

	equals(other: IFileCollection): boolean {
		throw new Error("Method not implemented.");
	}
}
