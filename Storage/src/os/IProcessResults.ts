import IDuration from "../core/time/IDuration";
import IProcessId from "./ProcessId";

export default interface IProcessResult {
	get id(): IProcessId;
	get executionLength(): IDuration;
	get output(): string[];
}
