// Author: Evan Coulson
import IEquatable from "../equatable/IEquatable";

export default interface IFileName extends IEquatable<IFileName> {
	get value(): string;
}
