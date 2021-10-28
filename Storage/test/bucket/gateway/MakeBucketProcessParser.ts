import tap from "tap";
import MakeBucketProcessParser from "../../../src/bucket/gateway/MakeBucketProcessParser";
import StorjBucket from "../../../src/bucket/entities/StorjBucket";
import StorjBucketName from "../../../src/bucket/value-objects/StorjBucketName";
import ProcessId from "../../../src/os/ProcessId";
import ProcessResult from "../../../src/os/ProcessResult";

tap.test("Should return bucket from result", (t) => {
	const name = "test";
	const parser = new MakeBucketProcessParser();
	const expectedBucket = new StorjBucket(new StorjBucketName(name));

	const bucket = parser.parse(
		new ProcessResult(new ProcessId(0), `Bucket ${name} created`)
	);

	t.ok(expectedBucket.equals(bucket));
	t.end();
});
