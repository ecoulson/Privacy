import tap from "tap";
import BucketGateway from "../../../src/bucket/gateway/BucketGateway";
import StorjBucket from "../../../src/bucket/entities/StorjBucket";
import StorjBucketName from "../../../src/bucket/value-objects/StorjBucketName";
import Context from "../../../src/Context";
import ProcessId from "../../../src/os/ProcessId";
import ProcessResult from "../../../src/os/ProcessResult";
import InMemoryProcessRunner from "../../test_utilities/InMemoryProcessRunner";

tap.beforeEach(() => {
	Context.processRunner = new InMemoryProcessRunner();
});

tap.test("Should create bucket", async (t) => {
	(Context.processRunner as InMemoryProcessRunner).queueResult(
		new ProcessResult(new ProcessId(0), "Bucket test created\n")
	);
	const gateway = new BucketGateway();
	const bucketName = new StorjBucketName("test");
	const expectedBucket = new StorjBucket(bucketName);

	const bucket = await gateway.create(bucketName);

	t.ok(bucket.equals(expectedBucket));
	t.end();
});
