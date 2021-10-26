import Assert from "../assert/Assert";
import IFileName from "../file/IFileName";
import BucketNameError from "./StorjBucketNameError";
import IllegalBucketNameException from "./IllegalBucketNameException";

export default class StorjBucketName implements IFileName {
	private static readonly BUCKET_NAME_PATTERN = new RegExp(
		/^[a-zA-Z0-9-_]*$/
	);
	private static readonly BUCKET_NAME_MAX_LENGTH = 64;
	private readonly name: string;

	constructor(name: string) {
		this.validateName(name);
		this.name = name;
	}

	private validateName(name: string) {
		Assert.notEmpty(
			name,
			this.createValidationError(BucketNameError.EMPTY)
		);
		Assert.lessThanOrEqualTo(
			name.length,
			StorjBucketName.BUCKET_NAME_MAX_LENGTH,
			this.createValidationError(BucketNameError.EXCEDES_MAX_LENGTH)
		);
		Assert.false(
			name.endsWith("-"),
			this.createValidationError(BucketNameError.ENDS_IN_DASH)
		);
		Assert.patternMatches(
			StorjBucketName.BUCKET_NAME_PATTERN,
			name,
			this.createValidationError(BucketNameError.HAS_ILLEGAL_CHARACTERS)
		);
	}

	private createValidationError(error: BucketNameError) {
		return new IllegalBucketNameException(error);
	}

	get value(): string {
		return this.name;
	}

	equals(other: IFileName): boolean {
		return this.value === other.value;
	}
}
