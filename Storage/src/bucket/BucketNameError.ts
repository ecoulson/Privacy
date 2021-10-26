enum BucketNameErrors {
	EMPTY = "Bucket can not have an empty name",
	EXCEDES_MAX_LENGTH = "Bucket name can not be longer than 64 characters",
	ENDS_IN_DASH = "Bucket name can not end in a dash",
	HAS_ILLEGAL_CHARACTERS = "Bucket name can only be alphanumeric with dash seperators and underscores",
}

export default BucketNameErrors;
