// Author: Evan Coulson
import tap from "tap";
import StorjBucketName from "../../src/bucket/StorjBucketName";
import CreateBucketException from "../../src/bucket/CreateBucketException";
import MakeBucketCommand from "../../src/bucket/MakeBucketCommand";

tap.test("Successfully create a bucket", async (t) => {
	const bucketName = "bucket";
	const command = new MakeBucketCommand(new StorjBucketName(bucketName), {
		spawn: async () => {
			return {
				id: { value: 1 },
				executionLength: {},
			};
		},
	});

	const bucket = await command.execute();

	t.not(bucket, null);
	t.equal(bucket.name.value, bucketName);
	t.equal(bucket.path.value, `sj://${bucketName}`);
	t.end();
});

tap.test("Fails to create bucket due to process error", async (t) => {
	const command = new MakeBucketCommand(new StorjBucketName("bucket"), {
		spawn: async () => {
			throw new Error("");
		},
	});

	try {
		await command.execute();
		t.fail();
	} catch (error) {
		t.match(error, new CreateBucketException());
		t.end();
	}
});
