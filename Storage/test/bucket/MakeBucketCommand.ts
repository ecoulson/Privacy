import tap from "tap";
import StorjBucketName from "../../src/bucket/StorjBucketName";
import MakeBucketCommand from "../../src/bucket/MakeBucketCommand";
import Context from "../../src/Context";
import InMemoryBucketGateway from "../test_utilities/InMemoryBucketGateway";
import BucketId from "../../src/bucket/BucketId";

tap.beforeEach(() => {
	Context.bucketGateway = new InMemoryBucketGateway();
});

tap.test("Successfully create a bucket", async (t) => {
	const bucketName = "bucket";
	const command = new MakeBucketCommand(new StorjBucketName(bucketName));

	const bucket = await command.execute();

	t.ok(Context.bucketGateway.findById(bucket.id as BucketId).equals(bucket));
	t.end();
});
