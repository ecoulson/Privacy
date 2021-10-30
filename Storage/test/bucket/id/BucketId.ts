import tap from "tap";
import BucketId from "../../../src/bucket/id/BucketId";
import FileName from "../../../src/core/file/FileName";
import ProcessId from "../../../src/core/process/ProcessId";

tap.test("Bucket ids with the same key should be equal", (t) => {
	const bucketIdA = new BucketId(new FileName("bucketA"));
	const bucketIdB = new BucketId(new FileName("bucketA"));

	t.ok(bucketIdA.equals(bucketIdB));
	t.end();
});

tap.test("Bucket ids with the different key should not be equal", (t) => {
	const bucketIdA = new BucketId(new FileName("bucketA"));
	const bucketIdB = new BucketId(new FileName("bucketB"));

	t.notOk(bucketIdA.equals(bucketIdB));
	t.end();
});

tap.test("Bucket should not be equal to a different id type", (t) => {
	const idA = new BucketId(new FileName("0"));
	const idB = new ProcessId(0);

	t.notOk(idA.equals(idB));
	t.end();
});
