// Author: Evan Coulson
import tap from "tap";
import FilePath from "../../src/file/FilePath";

tap.test("Creates a file path", (t) => {
	const filePath = new FilePath("/foo");

	t.equal(filePath.value, "/foo");
	t.end();
});

tap.test("Should throw with empty path", (t) => {
	t.throws(() => {
		new FilePath("");
	}, new Error("File path can not be empty"));
	t.end();
});

tap.test("File path should be equivalent", (t) => {
	const filePathA1 = new FilePath("/a");
	const filePathA2 = new FilePath("/a");
	const filePathB = new FilePath("/b");

	t.ok(filePathA1.equals(filePathA2));
	t.notOk(filePathA1.equals(filePathB));
	t.end();
});
