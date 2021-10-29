import tap from "tap";
import StorjBucket from "../../src/bucket/entities/StorjBucket";
import StorjBucketName from "../../src/bucket/value-objects/StorjBucketName";
import StorjAPI from "../../src/storj/StorjAPI";
import TestContextSetup from "../test_utilities/TestContextSetup";

tap.beforeEach(() => {
	TestContextSetup.setup();
});

tap.test("Should create bucket", async (t) => {
	const storj = new StorjAPI();
	const name = new StorjBucketName("test");
	const expectedBucket = new StorjBucket(name);
	const bucket = await storj.bucket.createBucket("test");

	t.ok(bucket.equals(expectedBucket));
	t.end();
});
