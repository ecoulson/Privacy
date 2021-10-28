import IFileName from "../../core/file/IFileName";

export default class BucketNameExistsException extends Error {
	public name: string = "BucketNameExistsException";

	constructor(name: IFileName) {
		super(`Bucket with name ${name.value} already exists`);
	}
}
