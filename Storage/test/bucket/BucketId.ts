import tap from "tap";
import BucketId from "../../src/bucket/BucketId";
import FileName from "../../src/file/FileName";

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

tap.test("Bucket should have value of the file name", (t) => {
	const id = new BucketId(new FileName("bucketA"));

	t.equal(id.value, "bucketA");
	t.end();
});
