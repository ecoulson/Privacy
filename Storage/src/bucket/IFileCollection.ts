import IEquatable from "../core/interfaces/IEquatable";
import IFile from "../core/file/IFile";
import IFilePath from "../core/file/IFilePath";

export default interface IFileCollection extends IEquatable<IFileCollection> {
	add(file: IFile): IFileCollection;
	remove(key: IFilePath): IFileCollection;
	get(key: IFilePath): IFile;
	has(key: IFilePath): boolean;
	size(): number;
	update(key: IFilePath, file: IFile): IFileCollection;
}
