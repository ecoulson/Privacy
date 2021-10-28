import IEquatable from "../core/interfaces/IEquatable";

export default interface IArgumentList extends IEquatable<IArgumentList> {
	getArgument(index: number): string;
	size(): number;
}