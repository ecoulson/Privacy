import IProcessResult from "./IProcessResults";
import IProcessDTO from "./IProcessDTO";

export default interface IProcessRunner {
	run(processDTO: IProcessDTO): Promise<IProcessResult>;
}
