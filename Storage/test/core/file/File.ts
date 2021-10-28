//Author: Evan Coulson
import tap from "tap";
import File from "../../../src/core/file/File";
import FileName from "../../../src/core/file/FileName";
import FilePath from "../../../src/core/file/FilePath";

tap.test("Should create a file", (t) => {
	const file = new File(new FilePath("/foo/bar.txt"));

	t.ok(file.name.equals(new FileName("bar.txt")));
	t.ok(file.path.equals(new FilePath("/foo/bar.txt")));
	t.end();
});

tap.test("Should check that files are equivalent", (t) => {
	const fileA1 = new File(new FilePath("/foo/a.txt"));
	const fileA2 = new File(new FilePath("/foo/a.txt"));
	const fileB = new File(new FilePath("/foo/b.txt"));

	t.ok(fileA1.equals(fileA2));
	t.notOk(fileA1.equals(fileB));
	t.end();
});
