import IProcessResult from "../../src/os/IProcessResults";
import IProcessResults from "../../src/os/IProcessResults";
import IProcessRunner from "../../src/os/IProcessRunner";

export default class InMemoryProcessRunner implements IProcessRunner {
	private resultQueue: IProcessResult[];

	constructor() {
		this.resultQueue = [];
	}

	queueResult(processResult: IProcessResult) {
		this.resultQueue.push(processResult);
	}

	async spawn(): Promise<IProcessResults> {
		if (this.resultQueue.length === 0) {
			throw new Error("No results queued in the process runner");
		}
		return this.resultQueue.pop() as IProcessResult;
	}
}
