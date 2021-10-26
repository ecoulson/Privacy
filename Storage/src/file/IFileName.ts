import IEquatable from "../utility/IEquatable";

export default interface IFileName extends IEquatable<IFileName> {
	get value(): string;
}
