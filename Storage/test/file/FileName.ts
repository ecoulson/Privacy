import tap from "tap";
import FileName from "../../src/core/file/FileName";

tap.test("File name should have correct name and extension", (t) => {
	const name = new FileName("file.txt");

	t.equal(name.value, "file.txt");
	t.equal(name.file, "file");
	t.equal(name.type, "txt");
	t.end();
});

tap.test("File name should handle multiple extensions", (t) => {
	const name = new FileName("file.spec.txt");

	t.equal(name.value, "file.spec.txt");
	t.equal(name.file, "file.spec");
	t.equal(name.type, "txt");
	t.end();
});

tap.test("File names should be equivalent", (t) => {
	const fileNameA1 = new FileName("a.txt");
	const fileNameA2 = new FileName("a.txt");
	const fileNameB = new FileName("b.txt");

	t.ok(fileNameA1.equals(fileNameA2));
	t.notOk(fileNameA1.equals(fileNameB));

	t.end();
});

tap.test("File name with no extension should be handled properly", (t) => {
	const name = new FileName("file");

	t.equal(name.value, "file");
	t.equal(name.file, "file");
	t.equal(name.type, "");
	t.end();
});
