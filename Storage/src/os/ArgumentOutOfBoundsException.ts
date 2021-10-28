export default class ArgumentOutOfBoundsException extends Error {
	public name: string = "ArgumentOutOfBoundsException";

	constructor(args: string[], index: number) {
		super(
			`Can not access argument ${index} in argument list with length ${args.length}`
		);
	}
}
