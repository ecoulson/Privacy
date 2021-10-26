import IEquatable from "../interfaces/IEquatable";

export default interface IFileName extends IEquatable<IFileName> {
	get value(): string;
}
