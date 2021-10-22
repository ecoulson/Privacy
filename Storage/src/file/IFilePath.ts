// Author: Evan Coulson
import IEquatable from "../equatable/IEquatable";

export default interface IFilePath extends IEquatable<IFilePath> {
	get value(): string;
}
