import IProcessResult from "../../src/core/process/IProcessResult";
import IProcessResults from "../../src/core/process/IProcessResult";
import IProcessRunner from "../../src/core/process/IProcessRunner";

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
