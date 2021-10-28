import Context from "../Context";
import IFileName from "../core/file/IFileName";
import ArgumentList from "../os/ArgumentList";
import IProcessResult from "../os/IProcessResults";
import ProcessArguments from "../os/ProcessArguments";
import BucketId from "./BucketId";
import IBucket from "./IBucket";
import IBucketGateway from "./IBucketGateway";
import StorjBucket from "./StorjBucket";
import StorjBucketName from "./StorjBucketName";
import StorjBucketPath from "./StorjBucketPath";

export default class BucketGateway implements IBucketGateway {
	private static readonly UPLINK_COMMAND = "uplink";
	private static readonly MAKE_BUCKET_ARGUMENT = "mb";

	async create(name: IFileName): Promise<IBucket> {
		const path = new StorjBucketPath(name);
		const result = await this.spawnProcess(
			new ArgumentList([BucketGateway.MAKE_BUCKET_ARGUMENT, path.value])
		);
		const extractedName = this.extractBucketName(result);
		const bucketName = new StorjBucketName(extractedName);
		return new StorjBucket(bucketName);
	}

	private spawnProcess(args: ArgumentList) {
		return Context.processRunner.spawn(
			new ProcessArguments(BucketGateway.UPLINK_COMMAND, args)
		);
	}

	private extractBucketName(result: IProcessResult) {
		return result.output.split(" ")[1];
	}

	findById(id: BucketId): Promise<IBucket> {
		throw new Error("Method not implemented.");
	}
}
