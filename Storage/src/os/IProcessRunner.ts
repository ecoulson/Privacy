import IProcessResult from "./IProcessResults";
import IProcessDTO from "./IProcessDTO";

export default interface IProcessRunner {
	spawn(processDTO: IProcessDTO): Promise<IProcessResult>;
}
