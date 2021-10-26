import IEquatable from "../utility/IEquatable";

export default interface IId extends IEquatable<IId> {
	get value(): string;
}
