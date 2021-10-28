import Assert from "../core/assert/Assert";
import IFileName from "../core/file/IFileName";
import BucketNameError from "./StorjBucketNameError";
import IllegalBucketNameException from "./IllegalBucketNameException";

export default class StorjBucketName implements IFileName {
	public static readonly BUCKET_NAME_PATTERN = new RegExp(/^[a-zA-Z0-9-_]*$/);
	private static readonly BUCKET_NAME_MAX_LENGTH = 64;
	private readonly name: string;

	constructor(name: string) {
		this.validateName(name);
		this.name = name;
	}

	private validateName(name: string) {
		Assert.notEmpty(
			name,
			this.createValidationError(BucketNameError.EMPTY, name)
		);
		Assert.lessThanOrEqualTo(
			name.length,
			StorjBucketName.BUCKET_NAME_MAX_LENGTH,
			this.createValidationError(BucketNameError.EXCEDES_MAX_LENGTH, name)
		);
		Assert.false(
			name.endsWith("-"),
			this.createValidationError(BucketNameError.ENDS_IN_DASH, name)
		);
		Assert.patternMatches(
			StorjBucketName.BUCKET_NAME_PATTERN,
			name,
			this.createValidationError(
				BucketNameError.HAS_ILLEGAL_CHARACTERS,
				name
			)
		);
	}

	private createValidationError(error: BucketNameError, name: string) {
		return new IllegalBucketNameException(error, name);
	}

	get value(): string {
		return this.name;
	}

	equals(other: IFileName): boolean {
		return this.value === other.value;
	}
}
