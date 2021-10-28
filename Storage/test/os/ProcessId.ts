import tap from "tap";
import BucketId from "../../src/bucket/BucketId";
import StorjBucketName from "../../src/bucket/StorjBucketName";
import ProcessId from "../../src/os/ProcessId";

tap.test("Two ids with the same value are equivalent", (t) => {
	const idA = new ProcessId(0);
	const idB = new ProcessId(0);

	t.ok(idA.equals(idB));
	t.end();
});

tap.test("Two ids with different pids are not equivalent", (t) => {
	const idA = new ProcessId(0);
	const idB = new ProcessId(1);

	t.notOk(idA.equals(idB));
	t.end();
});

tap.test("Two ids with differnt id types are not equivalent", (t) => {
	const idA = new ProcessId(0);
	const idB = new BucketId(new StorjBucketName("0"));

	t.notOk(idA.equals(idB));
	t.end();
});
