import IProcessResult from "./IProcessResults";
import IProcessArguments from "./IProcessArguments";

export default interface IProcessRunner {
	spawn(processArguments: IProcessArguments): Promise<IProcessResult>;
}
