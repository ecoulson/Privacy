import IBucket from "./IBucket";
import ICommand from "../core/command/ICommand";
import StorjBucket from "./StorjBucket";
import StorjBucketName from "./StorjBucketName";
import Context from "../Context";

export default class MakeBucketCommand implements ICommand<IBucket> {
	private readonly name: StorjBucketName;

	constructor(name: StorjBucketName) {
		this.name = name;
	}

	async execute(): Promise<IBucket> {
		return await this.makeBucket();
	}

	private async makeBucket() {
		return Context.bucketGateway.save(new StorjBucket(this.name));
	}
}
