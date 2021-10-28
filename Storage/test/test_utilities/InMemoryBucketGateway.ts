import BucketId from "../../src/bucket/id/BucketId";
import IBucket from "../../src/bucket/entities/IBucket";
import IBucketGateway from "../../src/bucket/gateway/IBucketGateway";
import StorjBucket from "../../src/bucket/entities/StorjBucket";
import IFileName from "../../src/core/file/IFileName";
import InMemoryGatewayUtilities from "./InMemoryGatewayUtilities";

export default class InMemoryBucketGateway
	extends InMemoryGatewayUtilities<IBucket>
	implements IBucketGateway
{
	async findById(id: BucketId): Promise<IBucket> {
		const bucket = this.getAllEntities().find((entity) => {
			return entity.id.equals(id);
		});
		if (!bucket) {
			throw new Error("Bucket not found in in-memory db");
		}
		return bucket;
	}

	async create(name: IFileName): Promise<IBucket> {
		const bucket = new StorjBucket(name);
		this.save(new StorjBucket(name));
		return bucket;
	}
}
