export default class Assert {
	static notEqual(a: any, b: any, message?: string) {
		if (a === b) {
			throw new Error(message);
		}
	}
}
