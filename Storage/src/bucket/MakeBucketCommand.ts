import IBucket from "./IBucket";
import ICommand from "../commands/ICommand";
import CreateBucketException from "./CreateBucketException";
import StorjBucket from "./StorjBucket";
import StorjBucketName from "./StorjBucketName";
import Context from "../Context";

export default class MakeBucketCommand implements ICommand<IBucket> {
	private readonly name: StorjBucketName;

	constructor(name: StorjBucketName) {
		this.name = name;
	}

	async execute(): Promise<IBucket> {
		try {
			return await this.makeBucket();
		} catch (error) {
			throw new CreateBucketException();
		}
	}

	private async makeBucket() {
		return Context.bucketGateway.save(new StorjBucket(this.name));
	}
}
