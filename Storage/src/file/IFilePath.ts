// Author: Evan Coulson
import IEquatable from "../utility/IEquatable";
import IFileName from "./IFileName";

export default interface IFilePath extends IEquatable<IFilePath> {
	get value(): string;
	get name(): IFileName;
}
