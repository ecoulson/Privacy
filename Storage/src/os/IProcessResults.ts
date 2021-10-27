import IDuration from "../core/time/IDuration";
import IProcessId from "./IProcessId";

export default interface IProcessResult {
	get id(): IProcessId;
	get executionLength(): IDuration;
}
