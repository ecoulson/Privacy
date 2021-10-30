import IProcessResult from "../../core/process/IProcessResult";

export default interface IProcessParser<T> {
	parse(processResult: IProcessResult): T;
}
