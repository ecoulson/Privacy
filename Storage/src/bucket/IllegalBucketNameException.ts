import BucketNameErrors from "./BucketNameErrors";

export default class IllegalBucketNameException extends Error {
	public name: string = "IllegalBucketNameException";

	constructor(message: BucketNameErrors) {
		super(message);
	}
}
