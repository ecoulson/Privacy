import IProcessId from "./IProcessId";
import IProcessResult from "./IProcessResults";

export default interface IProcess {
	get id(): IProcessId;
	run(): Promise<IProcessResult>;
}
