export default class Assert {
	static true(a: boolean, error: Error) {
		if (!a) {
			throw error;
		}
	}

	static false(a: boolean, error: Error) {
		if (a) {
			throw error;
		}
	}

	static lessThanOrEqualTo(a: number, b: number, error: Error) {
		Assert.true(a <= b, error);
	}

	static notEmpty(a: string, error: Error) {
		Assert.notEqual(a, "", error);
	}

	static notEqual(a: any, b: any, error: Error) {
		Assert.true(a !== b, error);
	}

	static patternMatches(pattern: RegExp, test: string, error: Error) {
		Assert.true(pattern.test(test), error);
	}
}
