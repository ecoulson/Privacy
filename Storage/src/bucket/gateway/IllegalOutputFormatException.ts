import IProcessResult from "../../os/IProcessResult";

export default class IllegalOutputFormatException extends Error {
	public name: string = "IllegalOutputFormatException";

	constructor(result: IProcessResult, pattern: RegExp) {
		super(
			`Output is not in expected format. Output was "${result.output}" and should have matched pattern ${pattern}`
		);
	}
}
