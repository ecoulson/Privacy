import IEquatable from "../interfaces/IEquatable";
import IFileName from "./IFileName";
import IFilePath from "./IFilePath";

export default interface IFile extends IEquatable<IFile> {
	get name(): IFileName;
	get path(): IFilePath;
}
