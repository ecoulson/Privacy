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
