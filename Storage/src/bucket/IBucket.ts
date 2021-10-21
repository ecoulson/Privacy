// Author: Evan Coulson
import IEquatable from "../equatable/IEquatable";
import IFileObject from "../file/IFileObject";
import { IBucketName } from "./IBucketName";
import IBucketPath from "./IBucketPath";

export default interface IBucket extends IEquatable<IBucket> {
	get name(): IBucketName;
	get path(): IBucketPath;
	get files(): IFileObject[];
	addFile(file: IFileObject): void;
	removeFile(path: IBucketPath): IFileObject;
	getFile(path: IBucketPath): IFileObject;
}
