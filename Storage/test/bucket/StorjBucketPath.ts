// Author: Evan Coulson
import tap from "tap";
import StorjBucketName from "../../src/bucket/StorjBucketName";
import StorjBucketPath from "../../src/bucket/StorjBucketPath";

tap.test("Should create a bucket path", (t) => {
	const name = new StorjBucketName("bucket");
	const path = new StorjBucketPath(name);

	t.equal(path.value, `sj://${name.value}`);

	t.end();
});

tap.test("Storj Bucket Path equivalency test", (t) => {
	const pathA1 = new StorjBucketPath(new StorjBucketName("pathA"));
	const pathA2 = new StorjBucketPath(new StorjBucketName("pathA"));
	const pathB = new StorjBucketPath(new StorjBucketName("pathB"));

	t.ok(pathA1.equals(pathA2));
	t.notOk(pathA1.equals(pathB));

	t.end();
});

tap.test("Should get storj bucket name from file path", (t) => {
	const expectedName = new StorjBucketName("foo");
	const path = new StorjBucketPath(expectedName);

	const name = path.name;

	t.ok(name.equals(expectedName));
	t.end();
});
