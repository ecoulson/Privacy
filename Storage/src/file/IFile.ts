// Author: Evan Coulson
import IEquatable from "../equatable/IEquatable";
import IFileName from "./IFileName";
import IFilePath from "./IFilePath";

export default interface IFile extends IEquatable<IFile> {
	name: IFileName;
	path: IFilePath;
}
