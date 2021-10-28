import IProcessResult from "../os/IProcessResults";

export default interface IProcessParser<T> {
	parse(processResult: IProcessResult): T;
}
