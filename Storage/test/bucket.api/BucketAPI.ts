import tap from "tap";
import BucketAPI from "../../src/bucket.api/BucketAPI";
import StorjBucket from "../../src/bucket/entities/StorjBucket";
import StorjBucketName from "../../src/bucket/value-objects/StorjBucketName";
import TestContextSetup from "../test_utilities/TestContextSetup";

tap.beforeEach(() => {
	TestContextSetup.setup();
});

tap.test("Should create a bucket", async (t) => {
	const api = new BucketAPI();
	const name = new StorjBucketName("test");
	const expectedBucket = new StorjBucket(name);

	const bucket = await api.createBucket(name.value);

	t.ok(bucket.equals(expectedBucket));
	t.end();
});
