export default interface IEquatable<T> {
	equals(a: T, b: T): boolean;
}
