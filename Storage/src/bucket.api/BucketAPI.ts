import CreateBucketService from "../bucket/service/CreateBucketService";
import IBucket from "../bucket/entities/IBucket";
import StorjBucketName from "../bucket/value-objects/StorjBucketName";
import Context from "../Context";

export default class BucketAPI {
	private createBucketService: CreateBucketService;

	constructor() {
		this.createBucketService = new CreateBucketService(
			Context.bucketGateway
		);
	}

	async createBucket(name: string): Promise<IBucket> {
		return await this.createBucketService.createBucket(
			new StorjBucketName(name)
		);
	}
}
