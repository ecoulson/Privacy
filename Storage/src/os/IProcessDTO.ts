// Author: Evan Coulson
export default interface IProcessDTO {
	get command(): string;
	get arguments(): string[];
}
