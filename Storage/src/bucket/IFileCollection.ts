import IEquatable from "../equatable/IEquatable";
import IFile from "../file/IFile";
import IFilePath from "../file/IFilePath";

// Author: Evan Coulson
export default interface IFileCollection extends IEquatable<IFileCollection> {
	add(file: IFile): IFileCollection;
	delete(key: IFilePath): IFileCollection;
	get(key: IFilePath): IFile;
	has(key: IFilePath): boolean;
	size(): number;
	update(file: IFile): IFileCollection;
}
