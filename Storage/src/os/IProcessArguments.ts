import IEquatable from "../core/interfaces/IEquatable";
import IArgumentList from "./IArgumentList";

export default interface IProcessArguments
	extends IEquatable<IProcessArguments> {
	get command(): string;
	get arguments(): IArgumentList;
}
