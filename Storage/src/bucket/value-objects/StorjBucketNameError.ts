enum StorjBucketNameErrors {
	EMPTY = "Bucket can not have an empty name",
	EXCEDES_MAX_LENGTH = "Bucket name can not be longer than 64 characters",
	HAS_ILLEGAL_CHARACTERS = "Bucket name can only be lowercase alphanumeric characters",
}

export default StorjBucketNameErrors;
