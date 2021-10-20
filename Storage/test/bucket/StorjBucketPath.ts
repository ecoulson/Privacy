import tap from "tap";
import BucketName from "../../src/bucket/BucketName";
import StorjBucketPath from "../../src/bucket/StorjBucketPath";

tap.test("Should create a bucket path", (t) => {
	const name = new BucketName("bucket");
	const path = new StorjBucketPath(name);

	t.equal(path.value, `sj://${name.value}`);

	t.end();
});
