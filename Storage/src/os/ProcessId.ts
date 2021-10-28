import IId from "../core/id/IId";

export default class ProcessId implements IId {
	get value(): string {
		throw new Error("Method not implemented.");
	}
	equals(other: IId): boolean {
		throw new Error("Method not implemented.");
	}
	
}
