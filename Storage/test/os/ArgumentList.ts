import tap from "tap";
import ArgumentList from "../../src/os/ArgumentList";
import ArgumentOutOfBoundsException from "../../src/os/ArgumentOutOfBoundsException";

tap.test("Empty argument lists are equal", (t) => {
	const argumentListA = new ArgumentList([]);
	const argumentListB = new ArgumentList([]);

	t.ok(argumentListA.equals(argumentListB));
	t.end();
});

tap.test("Argument lists with different sizes are not equal", (t) => {
	const argumentListA = new ArgumentList(["a"]);
	const argumentListB = new ArgumentList(["a", "b"]);

	t.notOk(argumentListA.equals(argumentListB));
	t.end();
});

tap.test("Argument lists with different values are not equal", (t) => {
	const argumentListA = new ArgumentList(["a", "c", "d"]);
	const argumentListB = new ArgumentList(["a", "b", "d"]);

	t.notOk(argumentListA.equals(argumentListB));
	t.end();
});

tap.test("Throws exception when accessing argument out of bounds", (t) => {
	const args: string[] = [];
	const index = 1;
	const argumentList = new ArgumentList(args);

	t.throws(() => {
		argumentList.getArgument(1);
	}, new ArgumentOutOfBoundsException(args, index));

	t.end();
});

tap.test("Should convert arguments to an array of string", (t) => {
	const args = ["a", "b", "c"];
	const argumentList = new ArgumentList(["a", "b", "c"]);

	t.match(argumentList.toArray(), args);
	t.end();
});
