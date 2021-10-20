import { IBucketName } from "./IBucketName";

export default class BucketName implements IBucketName {
	private readonly name: string;

	constructor(name: string) {
		if (name === "") {
			throw new Error("Bucket can not have an empty name");
		}
		this.name = name;
	}

	get value(): string {
		return this.name;
	}
}
