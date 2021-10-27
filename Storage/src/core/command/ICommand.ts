export default interface ICommand<T> {
	execute(): Promise<T>;
}
