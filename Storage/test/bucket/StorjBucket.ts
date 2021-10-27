import tap from "tap";
import StorjBucket from "../../src/bucket/StorjBucket";
import StorjBucketName from "../../src/bucket/StorjBucketName";
import File from "../../src/core/file/File";
import FilePath from "../../src/core/file/FilePath";
import UnknownFileException from "../../src/bucket/UnknownFileException";
import FileCollection from "../../src/bucket/FileCollection";

tap.test("Bucket should be properly initialized", (t) => {
	const name = new StorjBucketName("bucket");
	const bucket = new StorjBucket(name);

	t.equal(bucket.name.value, "bucket");
	t.equal(bucket.path.value, "sj://bucket");
	t.end();
});

tap.test("Buckets should be equal", (t) => {
	const name = new StorjBucketName("bucket");
	const bucketA = new StorjBucket(name);
	const bucketB = new StorjBucket(name);

	t.ok(bucketA.equals(bucketB));
	t.end();
});

tap.test("Buckets should give back an immutable list of files", (t) => {
	const name = new StorjBucketName("bucket");
	const bucket = new StorjBucket(name);

	const files = bucket.files.add(new File(new FilePath("/file")));

	t.equal(bucket.files.size(), 0);
	t.equal(files.size(), 1);
	t.end();
});

tap.test("Should throw when looking for a file that does not exist", (t) => {
	const name = new StorjBucketName("test");
	const bucket = new StorjBucket(name);
	const path = new FilePath("/unknown_file.txt");

	t.throws(() => {
		bucket.getFile(path);
	}, new UnknownFileException(name, path));

	t.end();
});

tap.test("Adding a file should return a new bucket with the file", (t) => {
	const name = new StorjBucketName("bucket");
	const path = new FilePath("/bucket");
	const emptyBucket = new StorjBucket(name);

	const bucket = emptyBucket.addFile(new File(path));

	t.notOk(emptyBucket.equals(bucket));
	t.equal(bucket.files.size(), 1);
	t.ok(bucket.getFile(path).equals(new File(path)));
	t.end();
});

tap.test("Should update a file in the bucket", (t) => {
	const name = new StorjBucketName("bucket");
	const path = new FilePath("/file.txt");
	const updatedPath = new FilePath("/new-file.txt");
	const bucket = new StorjBucket(name, new FileCollection([new File(path)]));

	const updatedBucket = bucket.updateFile(path, new File(updatedPath));

	t.notOk(updatedBucket.equals(bucket));
	t.ok(updatedBucket.getFile(updatedPath).equals(new File(updatedPath)));
	t.end();
});

tap.test("Should throw when updating non existant file", (t) => {
	const name = new StorjBucketName("bucket");
	const path = new FilePath("/file.txt");
	const bucket = new StorjBucket(name);

	t.throws(() => {
		bucket.updateFile(path, new File(path));
	}, new UnknownFileException(name, path));

	t.end();
});

tap.test("Should delete file when file is in bucket", (t) => {
	const path = new FilePath("/file.txt");
	const bucket = new StorjBucket(
		new StorjBucketName("bucket"),
		new FileCollection([new File(path)])
	);

	const emptyBucket = bucket.removeFile(path);

	t.notOk(emptyBucket.files.has(path));
	t.end();
});

tap.test("Should throw error when removing path that does not exist", (t) => {
	const path = new FilePath("/file.txt");
	const name = new StorjBucketName("bucket");
	const bucket = new StorjBucket(name);

	t.throws(() => {
		bucket.removeFile(path);
	}, new UnknownFileException(name, path));
	t.end();
});

tap.test("Should create a clone of a bucket", (t) => {
	const bucket = new StorjBucket(new StorjBucketName("test"));

	const clone = bucket.clone();

	t.ok(bucket.equals(clone));
	t.end();
});
