import IProcessId from "./ProcessId";

export default interface IProcessResult {
	get id(): IProcessId;
	get output(): string;
	hasErrors(): boolean;
	formatErrors(): string;
}
