// Author: Evan Coulson
import tap from "tap";
import BucketName from "../../src/bucket/BucketName";
import BucketNameError from "../../src/bucket/BucketNameError";
import IllegalBucketNameException from "../../src/bucket/IllegalBucketNameException";

tap.test("Bucket should have passed name", (t) => {
	const bucketName = "bucket";
	const name = new BucketName(bucketName);

	t.equal(bucketName, name.value);
	t.end();
});

tap.test("Bucket can not have an empty name", (t) => {
	t.throws(() => {
		new BucketName("");
	}, new IllegalBucketNameException(BucketNameError.EMPTY));

	t.end();
});

tap.test("Bucket name can not be longer than 64 characters", (t) => {
	t.throws(() => {
		new BucketName(
			"12345678901234567890123456789012345678901234567890123456789012345"
		);
	}, new IllegalBucketNameException(BucketNameError.EXCEDES_MAX_LENGTH));

	t.end();
});

tap.test("Bucket name can not end in a dash", (t) => {
	t.throws(() => {
		new BucketName("test-");
	}, new IllegalBucketNameException(BucketNameError.ENDS_IN_DASH));
	t.end();
});

tap.test("Bucket name has illegal characters", (t) => {
	t.throws(() => {
		new BucketName("test@@");
	}, new IllegalBucketNameException(BucketNameError.HAS_ILLEGAL_CHARACTERS));

	t.end();
});

tap.test("Bucket equivalency", (t) => {
	const bucketNameA1 = new BucketName("bucketA");
	const bucketNameA2 = new BucketName("bucketA");
	const bucketNameB = new BucketName("bucketB");

	t.ok(bucketNameA1.equals(bucketNameA2));
	t.notOk(bucketNameA1.equals(bucketNameB));
	t.end();
});
