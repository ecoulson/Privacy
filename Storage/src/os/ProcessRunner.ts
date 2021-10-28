import IProcessArguments from "./IProcessArguments";
import IProcessResults from "./IProcessResults";
import IProcessRunner from "./IProcessRunner";
import { spawn } from "child_process";

export default class ProcessRunner implements IProcessRunner {
	spawn(processArguments: IProcessArguments): Promise<IProcessResults> {
		const process = spawn(
			processArguments.command,
			processArguments.arguments.toArray()
		);
		throw new Error();
	}
}
