import BucketAPI from "../bucket.api/BucketAPI";
import BucketGateway from "../bucket/gateway/BucketGateway";
import Context from "../Context";
import ProcessRunner from "../core/process/ProcessRunner";

export default class StorjAPI {
	private bucketAPI: BucketAPI;

	constructor() {
		Context.bucketGateway = new BucketGateway();
		Context.processRunner = new ProcessRunner();
		this.bucketAPI = new BucketAPI();
	}

	get bucket(): BucketAPI {
		return this.bucketAPI;
	}
}
