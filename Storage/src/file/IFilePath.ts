import IEquatable from "../equatable/IEquatable";

// Author: Evan Coulson
export default interface IFilePath extends IEquatable<IFilePath> {
	get value(): string;
}
