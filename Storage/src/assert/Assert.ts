// Author: Evan Coulson
export default class Assert {
	static notNull(a: any, error?: Error) {
		this.notEqual(a, null, error);
	}

	static notEmpty(a: string, error?: Error) {
		this.notEqual(a, "", error);
	}

	static notEqual(a: any, b: any, error?: Error) {
		if (a === b) {
			throw error;
		}
	}
}
