import tap from "tap";
import ProcessError from "../../../src/core/process/ProcessError";
import ProcessId from "../../../src/core/process/ProcessId";
import ProcessResult from "../../../src/core/process/ProcessResult";

tap.test("Should create a process result with id and output", (t) => {
	const result = new ProcessResult(new ProcessId(0), "output");

	t.ok(result.id.equals(new ProcessId(0)));
	t.equal(result.output, "output");
	t.end();
});

tap.test("Should not have any errors", (t) => {
	const result = new ProcessResult(new ProcessId(0), "output");

	t.notOk(result.hasErrors());
	t.end();
});

tap.test("Should have errors", (t) => {
	const result = new ProcessResult(new ProcessId(0), "output", [
		new ProcessError("PROCESS", "Error"),
	]);

	t.ok(result.hasErrors());
	t.end();
});

tap.test("Should format errors", (t) => {
	const error = new ProcessError("PROCESS", "Error");
	const result = new ProcessResult(new ProcessId(0), "output", [
		error,
		error,
	]);

	t.equal(
		result.formatErrors(),
		`Process Errors:\n${error.format()}${error.format()}`
	);
	t.end();
});
