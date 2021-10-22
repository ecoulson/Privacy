import tap from "tap";
import FilePath from "../../src/file/FilePath";

// Author: Evan Coulson
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
