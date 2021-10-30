import IProcessResult from "./IProcessResult";
import IProcessArguments from "./IProcessArguments";

export default interface IProcessRunner {
	spawn(processArguments: IProcessArguments): Promise<IProcessResult>;
}
