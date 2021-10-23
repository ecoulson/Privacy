// Author: Evan Coulson
import IEquatable from "../equatable/IEquatable";
import IFile from "../file/IFile";
import IFileName from "../file/IFileName";
import IFilePath from "../file/IFilePath";
import IFileCollection from "./IFileCollection";

export default interface IBucket extends IEquatable<IBucket> {
	get name(): IFileName;
	get path(): IFilePath;
	get files(): IFileCollection;
	addFile(file: IFile): IBucket;
	getFile(path: IFilePath): IFile;
	updateFile(object: IFile): IBucket;
	removeFile(path: IFilePath): IBucket;
}
