import Assert from "../assert/Assert";
import { IBucketName } from "./IBucketName";

export default class BucketName implements IBucketName {
	private readonly name: string;

	constructor(name: string) {
		Assert.notEqual(name, "", "Bucket can not have an empty name");
		this.name = name;
	}

	get value(): string {
		return this.name;
	}
}
