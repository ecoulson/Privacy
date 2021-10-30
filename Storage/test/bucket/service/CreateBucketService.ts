import tap from "tap";
import StorjBucketName from "../../../src/bucket/value-objects/StorjBucketName";
import CreateBucketService from "../../../src/bucket/service/CreateBucketService";
import Context from "../../../src/Context";
import BucketId from "../../../src/bucket/id/BucketId";
import BucketNameExistsException from "../../../src/bucket/service/BucketNameExistsException";
import TestContextSetup from "../../test_utilities/TestContextSetup";

tap.beforeEach(() => {
	TestContextSetup.setup();
});

tap.test("Successfully create a bucket", async (t) => {
	const service = new CreateBucketService(Context.bucketGateway);

	const bucket = await service.createBucket(new StorjBucketName("bucket"));

	const foundBucket = await Context.bucketGateway.findById(
		bucket.id as BucketId
	);
	t.ok(foundBucket.equals(bucket));
	t.end();
});

tap.test("Should fail to create bucket with duplicate name", async (t) => {
	const bucketName = new StorjBucketName("bucket");
	const service = new CreateBucketService(Context.bucketGateway);
	Context.bucketGateway.create(bucketName);

	try {
		await service.createBucket(bucketName);
		t.fail();
	} catch (err) {
		t.match(err, new BucketNameExistsException(bucketName));
	}
	t.end();
});
