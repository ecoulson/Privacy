import Assert from "../core/assert/Assert";
import IFile from "../core/file/IFile";
import IFilePath from "../core/file/IFilePath";
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

	remove(key: IFilePath): IFileCollection {
		Assert.true(this.has(key), new UnknownFileCollectionKey(key));
		return new FileCollection(this.excludeFileFromFiles(key));
	}

	private excludeFileFromFiles(key: IFilePath) {
		return this._files.filter((file) => !file.path.equals(key));
	}

	has(key: IFilePath): boolean {
		return this._files.some((file) => file.path.equals(key));
	}

	get(key: IFilePath): IFile {
		Assert.true(this.has(key), new UnknownFileCollectionKey(key));
		return this.searchForFile(key);
	}

	private searchForFile(key: IFilePath) {
		return this._files.find((file) => file.path.equals(key)) as IFile;
	}

	size(): number {
		return this._files.length;
	}

	update(key: IFilePath, updatedFile: IFile): IFileCollection {
		Assert.true(this.has(key), new UnknownFileCollectionKey(key));
		return new FileCollection(this.updateFileCollection(key, updatedFile));
	}

	private updateFileCollection(key: IFilePath, updatedFile: IFile) {
		return this._files.map((file) => {
			if (file.path.equals(key)) {
				return updatedFile;
			}
			return file;
		});
	}

	equals(other: IFileCollection): boolean {
		if (this.size() !== other.size()) {
			return false;
		}
		return this.hasEquivalentFiles(other);
	}

	private hasEquivalentFiles(other: IFileCollection) {
		return this._files.reduce<boolean>(
			(equal, file) => equal && other.has(file.path),
			true
		);
	}
}
