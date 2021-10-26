import tap from "tap";
import StorjBucketName from "../../src/bucket/StorjBucketName";
import BucketNameError from "../../src/bucket/StorjBucketNameError";
import IllegalBucketNameException from "../../src/bucket/IllegalBucketNameException";

tap.test("Bucket should have passed name", (t) => {
	const bucketName = "bucket";
	const name = new StorjBucketName(bucketName);

	t.equal(bucketName, name.value);
	t.end();
});

tap.test("Bucket can not have an empty name", (t) => {
	t.throws(() => {
		new StorjBucketName("");
	}, new IllegalBucketNameException(BucketNameError.EMPTY));

	t.end();
});

tap.test("Bucket name can not be longer than 64 characters", (t) => {
	t.throws(() => {
		new StorjBucketName(
			"12345678901234567890123456789012345678901234567890123456789012345"
		);
	}, new IllegalBucketNameException(BucketNameError.EXCEDES_MAX_LENGTH));

	t.end();
});

tap.test("Bucket name can not end in a dash", (t) => {
	t.throws(() => {
		new StorjBucketName("test-");
	}, new IllegalBucketNameException(BucketNameError.ENDS_IN_DASH));
	t.end();
});

tap.test("Bucket name has illegal characters", (t) => {
	t.throws(() => {
		new StorjBucketName("test@@");
	}, new IllegalBucketNameException(BucketNameError.HAS_ILLEGAL_CHARACTERS));

	t.end();
});

tap.test("Bucket equivalency", (t) => {
	const bucketNameA1 = new StorjBucketName("bucketA");
	const bucketNameA2 = new StorjBucketName("bucketA");
	const bucketNameB = new StorjBucketName("bucketB");

	t.ok(bucketNameA1.equals(bucketNameA2));
	t.notOk(bucketNameA1.equals(bucketNameB));
	t.end();
});
