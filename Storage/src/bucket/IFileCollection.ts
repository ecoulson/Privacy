import IEquatable from "../utility/IEquatable";
import IFile from "../file/IFile";
import IFilePath from "../file/IFilePath";

// Author: Evan Coulson
export default interface IFileCollection extends IEquatable<IFileCollection> {
	add(file: IFile): IFileCollection;
	remove(key: IFilePath): IFileCollection;
	get(key: IFilePath): IFile;
	has(key: IFilePath): boolean;
	size(): number;
	update(key: IFilePath, file: IFile): IFileCollection;
}
