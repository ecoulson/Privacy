import IEquatable from "../interfaces/IEquatable";

export default interface IId extends IEquatable<IId> {
	get value(): string;
}
