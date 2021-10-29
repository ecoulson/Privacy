import tap from "tap";
import StorjBucketName from "../../../src/bucket/value-objects/StorjBucketName";
import MakeBucketCommand from "../../../src/bucket/commands/MakeBucketCommand";
import Context from "../../../src/Context";
import BucketId from "../../../src/bucket/id/BucketId";
import BucketNameExistsException from "../../../src/bucket/commands/BucketNameExistsException";
import TestContextSetup from "../../test_utilities/TestContextSetup";

tap.beforeEach(() => {
	TestContextSetup.setup();
});

tap.test("Successfully create a bucket", async (t) => {
	const bucketName = "bucket";
	const command = new MakeBucketCommand(new StorjBucketName(bucketName));

	const bucket = await command.execute();

	const foundBucket = await Context.bucketGateway.findById(
		bucket.id as BucketId
	);
	t.ok(foundBucket.equals(bucket));
	t.end();
});

tap.test("Should fail to create bucket with duplicate name", async (t) => {
	const bucketName = new StorjBucketName("bucket");
	const command = new MakeBucketCommand(bucketName);
	Context.bucketGateway.create(bucketName);

	try {
		await command.execute();
		t.fail();
	} catch (err) {
		t.match(err, new BucketNameExistsException(bucketName));
	}
	t.end();
});
