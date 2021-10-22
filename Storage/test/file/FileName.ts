import tap from "tap";
import FileName from "../../src/file/FileName";

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
