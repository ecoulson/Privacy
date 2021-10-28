import IId from "../core/id/IId";

export default class ProcessId implements IId {
	private processId: number;

	constructor(processId: number) {
		this.processId = processId;
	}

	get value(): string {
		return this.processId.toString(10);
	}

	equals(other: IId): boolean {
		if (!this.isProcessId(other)) {
			return false;
		}
		return other.value === this.value;
	}

	private isProcessId(id: IId): id is ProcessId {
		return id instanceof ProcessId;
	}
}
