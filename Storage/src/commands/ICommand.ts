// Author: Evan Coulson
export default interface ICommand<T> {
	execute(): Promise<T>;
}
