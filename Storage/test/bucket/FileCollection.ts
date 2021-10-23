import tap from "tap";
import FileCollection from "../../src/bucket/FileCollection";
import UnknownFileCollectionKey from "../../src/bucket/UnknownFileCollectionKey";
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

tap.test("Should get a file", (t) => {
	const key = new FilePath("/foo.txt");
	const collection = new FileCollection([new File(key)]);

	const file = collection.get(key);

	t.ok(file.equals(new File(key)));
	t.end();
});

tap.test("Should throw when getting non existant key", (t) => {
	const emptyCollection = new FileCollection();
	const key = new FilePath("/foo.txt");

	t.throws(() => {
		emptyCollection.get(key);
	}, new UnknownFileCollectionKey(key));

	t.end();
});

tap.test("File collection equivalency", (t) => {
	const pathA = new FilePath("/a.txt");
	const pathB = new FilePath("/b.txt");
	const emptyCollection = new FileCollection();
	const collectionWithFiles = new FileCollection([
		new File(pathA),
		new File(pathB),
	]);
	const collectionWithFilesInOtherOrder = new FileCollection([
		new File(pathB),
		new File(pathA),
	]);

	t.ok(collectionWithFiles.equals(collectionWithFilesInOtherOrder));
	t.notOk(collectionWithFiles.equals(emptyCollection));
	t.end();
});

tap.test("File collection can immutably update files", (t) => {
	const oldKey = new FilePath("/foo.txt");
	const newKey = new FilePath("/bar.txt");
	const oldCollection = new FileCollection([
		new File(new FilePath("/random2.txt")),
		new File(oldKey),
		new File(new FilePath("/random1.txt")),
	]);

	const newCollection = oldCollection.update(oldKey, new File(newKey));

	t.ok(oldCollection.has(oldKey));
	t.ok(newCollection.has(newKey));
	t.equal(oldCollection.size(), 3);
	t.equal(newCollection.size(), 3);
	t.end();
});

tap.test("File collection throws when updating nonexistant key", (t) => {
	const collection = new FileCollection();
	const key = new FilePath("/foo.txt");

	t.throws(() => {
		collection.update(key, new File(key));
	}, new UnknownFileCollectionKey(key));
	t.end();
});

tap.test("Should remove file from file collection", (t) => {
	const key = new FilePath("/foo.txt");
	const collectionWithFile = new FileCollection([new File(key)]);

	const emptyCollection = collectionWithFile.remove(key);

	t.ok(collectionWithFile.has(key));
	t.notOk(emptyCollection.has(key));
	t.equal(collectionWithFile.size(), 1);
	t.equal(emptyCollection.size(), 0);
	t.end();
});

tap.test("Should throw when removing non existant key", (t) => {
	const key = new FilePath("/bar.txt");
	const collection = new FileCollection();

	t.throws(() => {
		collection.remove(key);
	}, new UnknownFileCollectionKey(key));
	t.end();
});
