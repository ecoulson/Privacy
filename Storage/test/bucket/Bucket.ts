import tap from "tap";
import Bucket from "../../src/bucket/Bucket";
import BucketName from "../../src/bucket/BucketName";
import StorjBucketPath from "../../src/bucket/StorjBucketPath";

tap.test("Bucket should be properly initialized", (t) => {
	const name = new BucketName("bucket");
	const bucket = new Bucket(name, new StorjBucketPath(name));

	t.equal(bucket.name.value, "bucket");
	t.equal(bucket.path.value, "sj://bucket");
	t.end();
});

tap.test("Buckets should be equal", (t) => {
	const name = new BucketName("bucket");
	const bucketA = new Bucket(name, new StorjBucketPath(name));
	const bucketB = new Bucket(name, new StorjBucketPath(name));

	t.ok(bucketA.equals(bucketB));
	t.end();
});
