// Author: Evan Coulson
import tap from "tap";
import Bucket from "../../src/bucket/Bucket";
import BucketName from "../../src/bucket/BucketName";
import StorjBucketPath from "../../src/bucket/StorjBucketPath";
import File from "../../src/file/File";
import FilePath from "../../src/file/FilePath";

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

tap.test("Buckets should give back an immutable list of files", (t) => {
	const name = new BucketName("bucket");
	const bucket = new Bucket(name, new StorjBucketPath(name));

	const files = bucket.files;
	files.push(new File(new FilePath("/file")));

	t.equal(bucket.files.length, 0);
	t.equal(files.length, 1);
	t.end();
});

tap.test("Adding a file should return a new bucket with the file", (t) => {
	const name = new BucketName("bucket");
	const path = new FilePath("/bucket");
	const emptyBucket = new Bucket(name, new StorjBucketPath(name));

	const bucket = emptyBucket.addFile(new File(path));

	t.notOk(emptyBucket.equals(bucket));
	t.equal(bucket.files.length, 1);
	t.match(bucket.getFile(path), new File(path));
	t.end();
});
