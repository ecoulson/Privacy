import IBucket from "../entities/IBucket";
import StorjBucketName from "../value-objects/StorjBucketName";
import BucketId from "../id/BucketId";
import BucketNameExistsException from "./BucketNameExistsException";
import IBucketGateway from "../gateway/IBucketGateway";

export default class CreateBucketService {
	private readonly gateway: IBucketGateway;

	constructor(gateway: IBucketGateway) {
		this.gateway = gateway;
	}

	async createBucket(name: StorjBucketName): Promise<IBucket> {
		if (await this.doesBucketExist(name)) {
			throw new BucketNameExistsException(name);
		}
		return await this.makeBucket(name);
	}

	private async makeBucket(name: StorjBucketName): Promise<IBucket> {
		return this.gateway.create(name);
	}

	private async doesBucketExist(name: StorjBucketName): Promise<boolean> {
		try {
			await this.gateway.findById(new BucketId(name));
			return true;
		} catch {
			return false;
		}
	}
}
