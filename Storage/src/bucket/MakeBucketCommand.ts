import IBucket from "./IBucket";
import ICommand from "../core/command/ICommand";
import StorjBucketName from "./StorjBucketName";
import Context from "../Context";
import BucketId from "./BucketId";

export default class MakeBucketCommand implements ICommand<IBucket> {
	private readonly name: StorjBucketName;

	constructor(name: StorjBucketName) {
		this.name = name;
	}

	async execute(): Promise<IBucket> {
		if (await this.doesBucketExist()) {
			throw new Error(
				`Bucket with name ${this.name.value} already exists`
			);
		}
		return await this.makeBucket();
	}

	private async makeBucket(): Promise<IBucket> {
		return Context.bucketGateway.create(this.name);
	}

	private async doesBucketExist(): Promise<boolean> {
		try {
			await Context.bucketGateway.findById(new BucketId(this.name));
			return true;
		} catch {
			return false;
		}
	}
}
