import tap from "tap";
import ArgumentList from "../../src/os/ArgumentList";
import ProcessArguments from "../../src/os/ProcessArguments";

tap.test("Should create equivalent process arguments", (t) => {
	const argumentsA = new ProcessArguments("ls", new ArgumentList([]));
	const argumentsB = new ProcessArguments("ls", new ArgumentList([]));

	t.ok(argumentsA.equals(argumentsB));
	t.end();
});

tap.test("Should determine process arguments are not equal by command", (t) => {
	const argumentsA = new ProcessArguments("ls", new ArgumentList([]));
	const argumentsB = new ProcessArguments("pwd", new ArgumentList([]));

	t.notOk(argumentsA.equals(argumentsB));
	t.end();
});

tap.test("Should determine arguments are equal by arguments", (t) => {
	const argumentsA = new ProcessArguments("ls", new ArgumentList([]));
	const argumentsB = new ProcessArguments("ls", new ArgumentList([]));

	t.ok(argumentsA.equals(argumentsB));
	t.end();
});
