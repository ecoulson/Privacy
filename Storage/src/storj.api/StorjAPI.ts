import BucketAPI from "../bucket.api/BucketAPI";

export default class StorjAPI {
	private bucketAPI: BucketAPI;

	constructor() {
		this.bucketAPI = new BucketAPI();
	}

	get bucket(): BucketAPI {
		return this.bucketAPI;
	}
}
