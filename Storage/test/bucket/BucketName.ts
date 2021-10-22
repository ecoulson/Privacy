// Author: Evan Coulson
import tap from "tap";
import BucketName from "../../src/bucket/BucketName";

tap.test("Bucket should have passed name", (t) => {
	const bucketName = "bucket";
	const name = new BucketName(bucketName);

	t.equal(bucketName, name.value);
	t.end();
});

tap.test("Bucket can not have an empty name", (t) => {
	t.throws(() => {
		new BucketName("");
	}, "Bucket name can not be empty");

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
