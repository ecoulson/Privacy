import tap from "tap";
import ProcessError from "../../src/os/ProcessError";

tap.test("Should correctly format a process error", (t) => {
	const error = new ProcessError("PROCESS", "message");

	t.equal(error.format(), "PROCESS: message\n\n");
	t.end();
});
