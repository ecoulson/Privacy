import IProcessResult from "../../os/IProcessResult";

export default interface IProcessParser<T> {
	parse(processResult: IProcessResult): T;
}
