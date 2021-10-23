// Author: Evan Coulson
export default class Assert {
	static true(a: boolean, error?: Error) {
		if (!a) {
			throw error;
		}
	}

	static notEmpty(a: string, error?: Error) {
		Assert.notEqual(a, "", error);
	}

	static notEqual(a: any, b: any, error?: Error) {
		Assert.true(a !== b, error);
	}
}
