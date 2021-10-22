import tap from "tap";
import FileCollection from "../../src/bucket/FileCollection";
import File from "../../src/file/File";
import FilePath from "../../src/file/FilePath";

tap.test("Should immutably add to file collection", (t) => {
	const emptyCollection = new FileCollection();
	const path = new FilePath("/foo.txt");

	const collection = emptyCollection.add(new File(path));

	t.ok(collection.has(path));
	t.notOk(emptyCollection.has(path));
	t.equal(emptyCollection.size(), 0);
	t.equal(collection.size(), 1);
	t.end();
});
