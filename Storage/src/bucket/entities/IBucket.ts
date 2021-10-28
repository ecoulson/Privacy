import IFile from "../../core/file/IFile";
import IFileName from "../../core/file/IFileName";
import IFilePath from "../../core/file/IFilePath";
import IFileCollection from "../file-collection/IFileCollection";
import IEntity from "../../core/entities/IEntity";
import IEquatable from "../../core/interfaces/IEquatable";

export default interface IBucket extends IEntity, IEquatable<IBucket> {
	get name(): IFileName;
	get path(): IFilePath;
	get files(): IFileCollection;
	addFile(file: IFile): IBucket;
	getFile(path: IFilePath): IFile;
	updateFile(path: IFileName, object: IFile): IBucket;
	removeFile(path: IFilePath): IBucket;
}
