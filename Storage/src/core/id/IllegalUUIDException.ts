export default class IllegalUUIDException extends Error {
	public name: string = "IllegalUUIDException";

	constructor(value: string) {
		super(`${value} is not a legal UUID`);
	}
}
