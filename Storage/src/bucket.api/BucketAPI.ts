import MakeBucketCommand from "../bucket/commands/MakeBucketCommand";
import IBucket from "../bucket/entities/IBucket";
import StorjBucketName from "../bucket/value-objects/StorjBucketName";
import IBucketAPI from "./IBucketAPI";

export default class BucketAPI implements IBucketAPI {
	async createBucket(name: string): Promise<IBucket> {
		return await new MakeBucketCommand(new StorjBucketName(name)).execute();
	}
}
