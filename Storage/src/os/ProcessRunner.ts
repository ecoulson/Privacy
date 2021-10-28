import IProcessArguments from "./IProcessArguments";
import IProcessResult from "./IProcessResult";
import IProcessRunner from "./IProcessRunner";
import { spawn } from "child_process";
import ProcessResult from "./ProcessResult";
import ProcessId from "./ProcessId";
import ProcessError from "./ProcessError";

export default class ProcessRunner implements IProcessRunner {
	spawn(processArguments: IProcessArguments): Promise<IProcessResult> {
		return new Promise((resolve) => {
			const process = spawn(
				processArguments.command,
				processArguments.arguments.toArray()
			);
			const errors: ProcessError[] = [];
			const chunks: string[] = [];

			process.stdout.on("data", (data) => {
				chunks.push(data);
			});

			process.stderr.on("data", (data) =>
				errors.push(new ProcessError("PROCESS", data))
			);

			process.on("close", (code) => {
				if (code && code > 0) {
					errors.push(
						new ProcessError(
							"CODE",
							`Process failed with code "${code}"`
						)
					);
				}
				resolve(
					new ProcessResult(
						new ProcessId(process.pid!),
						chunks.join(""),
						errors
					)
				);
			});

			process.on("error", (error) =>
				errors.push(new ProcessError(error.name, error.message))
			);
		});
	}
}
