import Assert from "../assert/Assert";
import IFileName from "../file/IFileName";
import EmptyBucketNameException from "./EmptyBucketNameException";

export default class BucketName implements IFileName {
	private readonly name: string;

	constructor(name: string) {
		Assert.notEmpty(name, new EmptyBucketNameException());
		this.name = name;
	}

	get value(): string {
		return this.name;
	}

	equals(other: IFileName): boolean {
		return this.value === other.value;
	}
}
