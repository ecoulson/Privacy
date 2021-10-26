// Author: Evan Coulson
export default interface IEquatable<T> {
	equals(other: T): boolean;
}
