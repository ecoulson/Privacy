import tap from "tap";
import BucketGateway from "../../../src/bucket/gateway/BucketGateway";
import StorjBucket from "../../../src/bucket/entities/StorjBucket";
import StorjBucketName from "../../../src/bucket/value-objects/StorjBucketName";
import Context from "../../../src/Context";
import ProcessId from "../../../src/os/ProcessId";
import ProcessResult from "../../../src/os/ProcessResult";
import InMemoryProcessRunner from "../../test_utilities/InMemoryProcessRunner";
import BucketId from "../../../src/bucket/id/BucketId";
import BucketNotFoundException from "../../../src/bucket/gateway/BucketNotFoundException";
import TestContextSetup from "../../test_utilities/TestContextSetup";

tap.beforeEach(() => {
	TestContextSetup.setup();
});

function queueResult(result: ProcessResult) {
	(Context.processRunner as InMemoryProcessRunner).queueResult(result);
}

tap.test("Should create bucket", async (t) => {
	const gateway = new BucketGateway();
	const bucketName = new StorjBucketName("test");
	const expectedBucket = new StorjBucket(bucketName);
	const createOutput = `Bucket ${bucketName.value} created\n`;
	queueResult(new ProcessResult(new ProcessId(0), createOutput));

	const bucket = await gateway.create(bucketName);

	t.ok(bucket.equals(expectedBucket));
	t.end();
});

tap.test("Should find a bucket by id", async (t) => {
	const gateway = new BucketGateway();
	const rawName = "bucketa";
	const bucketName = new StorjBucketName(rawName);
	const expectedBucket = new StorjBucket(bucketName);
	const listOutput = `BKT 2021-10-26 13:59:49 ${rawName}\nBKT 2021-10-26 13:59:43 bucketb\n`;
	queueResult(new ProcessResult(new ProcessId(0), listOutput));

	const bucket = await gateway.findById(new BucketId(bucketName));

	t.ok(bucket.equals(expectedBucket));
	t.end();
});

tap.test("Should throw when bucket does not exist", async (t) => {
	const gateway = new BucketGateway();
	const bucketName = new StorjBucketName("bucketa");
	const listOutput = `BKT 2021-10-26 13:59:43 bucketb\n`;
	queueResult(new ProcessResult(new ProcessId(0), listOutput));

	try {
		await gateway.findById(new BucketId(bucketName));
		t.fail();
	} catch (error) {
		t.match(error, new BucketNotFoundException(new BucketId(bucketName)));
	}
	t.end();
});
