import tap from "tap";
import UUID from "../../../src/core/id/UUID";

tap.test("Should throw exception for illegal UUID", (t) => {
	t.throws(() => {
		new UUID("");
	});

	t.end();
});

tap.test("Should create a UUID with a random value", (t) => {
	const id = new UUID();

	t.ok(id.value.length > 0);
	t.end();
});

tap.test("Should determine that two UUIDS are not the same", (t) => {
	const idA = new UUID("92ef4c3e-fe3f-4de8-8e96-5e80957eb431");
	const idB = new UUID("8e2b19e0-d92d-47a3-8a15-74d446c30524");

	t.notOk(idA.equals(idB));
	t.end();
});

tap.test("Should determine that two same ids are equivalent", (t) => {
	const idA = new UUID("92ef4c3e-fe3f-4de8-8e96-5e80957eb431");
	const idB = new UUID("92ef4c3e-fe3f-4de8-8e96-5e80957eb431");

	t.ok(idA.equals(idB));
	t.end();
});
