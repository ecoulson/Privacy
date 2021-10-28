import StorjBucketNameErrors from "./StorjBucketNameError";

export default class IllegalBucketNameException extends Error {
	public name: string = "IllegalBucketNameException";

	constructor(message: StorjBucketNameErrors, name: string) {
		super(message + `, was: "${name}"`);
	}
}
