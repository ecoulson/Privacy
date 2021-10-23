// Author: Evan Coulson
import tap from "tap";
import BucketName from "../../src/bucket/BucketName";
import StorjBucketPath from "../../src/bucket/StorjBucketPath";

tap.test("Should create a bucket path", (t) => {
	const name = new BucketName("bucket");
	const path = new StorjBucketPath(name);

	t.equal(path.value, `sj://${name.value}`);

	t.end();
});

tap.test("Storj Bucket Path equivalency test", (t) => {
	const pathA1 = new StorjBucketPath(new BucketName("pathA"));
	const pathA2 = new StorjBucketPath(new BucketName("pathA"));
	const pathB = new StorjBucketPath(new BucketName("pathB"));

	t.ok(pathA1.equals(pathA2));
	t.notOk(pathA1.equals(pathB));

	t.end();
});

tap.test("Should get storj bucket name from file path", (t) => {
	const expectedName = new BucketName("foo");
	const path = new StorjBucketPath(expectedName);

	const name = path.name;

	t.ok(name.equals(expectedName));
	t.end();
});
