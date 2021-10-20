import tap from "tap";
import MakeBucketCommand from "../../src/bucket/MakeBucketCommand";

tap.test("Successfully create a bucket", async (t) => {
	const bucketName = "bucket";
	const command = new MakeBucketCommand({
		name: bucketName,
	});

	const bucket = await command.execute();

	t.not(bucket, null);
	t.equal(bucket.name, bucketName);
	t.end();
});
