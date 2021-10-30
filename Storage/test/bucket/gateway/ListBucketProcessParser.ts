import tap from "tap";
import StorjBucket from "../../../src/bucket/entities/StorjBucket";
import ListBucketsProcessParser from "../../../src/bucket/gateway/ListBucketsProcessParser";
import StorjBucketName from "../../../src/bucket/value-objects/StorjBucketName";
import ProcessId from "../../../src/core/process/ProcessId";
import ProcessResult from "../../../src/core/process/ProcessResult";

tap.test("Should find buckets in output", (t) => {
	const parser = new ListBucketsProcessParser();
	const output = `BKT 2021-10-26 13:59:49 bucketa\nBKT 2021-10-26 13:59:43 bucketb\n`;

	const buckets = parser.parse(new ProcessResult(new ProcessId(0), output));

	t.ok(buckets[0].equals(new StorjBucket(new StorjBucketName("bucketa"))));
	t.ok(buckets[1].equals(new StorjBucket(new StorjBucketName("bucketb"))));
	t.end();
});
