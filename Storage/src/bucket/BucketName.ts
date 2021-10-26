import Assert from "../assert/Assert";
import IFileName from "../file/IFileName";
import BucketNameErrors from "./BucketNameErrors";
import IllegalBucketNameException from "./IllegalBucketNameException";

export default class BucketName implements IFileName {
	private readonly name: string;

	constructor(name: string) {
		this.validateName(name);
		this.name = name;
	}

	private validateName(name: string) {
		Assert.notEmpty(
			name,
			new IllegalBucketNameException(BucketNameErrors.EMPTY)
		);
		Assert.lessThanOrEqualTo(
			name.length,
			64,
			new IllegalBucketNameException(BucketNameErrors.EXCEDES_MAX_LENGTH)
		);
		Assert.false(
			name.endsWith("-"),
			new IllegalBucketNameException(BucketNameErrors.ENDS_IN_DASH)
		);
	}

	get value(): string {
		return this.name;
	}

	equals(other: IFileName): boolean {
		return this.value === other.value;
	}
}
