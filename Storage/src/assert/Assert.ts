// Author: Evan Coulson
export default class Assert {
	static notEmpty(a: string, message?: string) {
		this.notEqual(a, "", message);
	}

	static notEqual(a: any, b: any, message?: string) {
		if (a === b) {
			throw new Error(message);
		}
	}
}
