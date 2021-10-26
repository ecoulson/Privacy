import IFile from "../file/IFile";
import IFileName from "../file/IFileName";
import IFilePath from "../file/IFilePath";
import IFileCollection from "./IFileCollection";
import IEntity from "../entities/IEntity";
import IEquatable from "../interfaces/IEquatable";

export default interface IBucket extends IEntity, IEquatable<IBucket> {
	get name(): IFileName;
	get path(): IFilePath;
	get files(): IFileCollection;
	addFile(file: IFile): IBucket;
	getFile(path: IFilePath): IFile;
	updateFile(path: IFileName, object: IFile): IBucket;
	removeFile(path: IFilePath): IBucket;
}
