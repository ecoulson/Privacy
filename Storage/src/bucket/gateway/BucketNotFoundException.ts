import BucketId from "../id/BucketId";

export default class BucketNotFoundException extends Error {
	public name: string = "BucketNotFoundException";

	constructor(id: BucketId) {
		super(`Bucket with id ${id.value} could not be found`);
	}
}
