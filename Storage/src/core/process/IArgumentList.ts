import IEquatable from "../interfaces/IEquatable";

export default interface IArgumentList extends IEquatable<IArgumentList> {
	getArgument(index: number): string;
	size(): number;
	toArray(): string[];
}
