import MakeBucketCommand from "../bucket/commands/MakeBucketCommand";
import IBucket from "../bucket/entities/IBucket";
import StorjBucketName from "../bucket/value-objects/StorjBucketName";

export default class BucketAPI {
	async createBucket(name: string): Promise<IBucket> {
		return await new MakeBucketCommand(new StorjBucketName(name)).execute();
	}
}
