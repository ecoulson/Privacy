import IEquatable from "../equatable/IEquatable";

// Author: Evan Coulson
export interface IFileName extends IEquatable<IFileName> {
	get value(): string;
}
