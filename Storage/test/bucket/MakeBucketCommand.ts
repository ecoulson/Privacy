// Author: Evan Coulson
import tap from "tap";
import StorjBucketName from "../../src/bucket/StorjBucketName";
import CreateBucketException from "../../src/bucket/CreateBucketException";
import MakeBucketCommand from "../../src/bucket/MakeBucketCommand";
import Context from "../../src/Context";

tap.beforeEach(() => {
	Context.bucketGateway = {
		save: (bucket) => bucket,
	};
});

tap.test("Successfully create a bucket", async (t) => {
	const bucketName = "bucket";
	const command = new MakeBucketCommand(new StorjBucketName(bucketName));

	const bucket = await command.execute();

	t.not(bucket, null);
	t.equal(bucket.name.value, bucketName);
	t.equal(bucket.path.value, `sj://${bucketName}`);
	t.end();
});

tap.test("Fails to create bucket due to process error", async (t) => {
	const command = new MakeBucketCommand(new StorjBucketName("bucket"));
	Context.bucketGateway = {
		save: () => {
			throw new Error();
		},
	};

	try {
		await command.execute();
		t.fail();
	} catch (error) {
		t.match(error, new CreateBucketException());
		t.end();
	}
});
