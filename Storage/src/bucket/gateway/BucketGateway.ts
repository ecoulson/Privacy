import Context from "../../Context";
import IFileName from "../../core/file/IFileName";
import ArgumentList from "../../core/process/ArgumentList";
import ProcessArguments from "../../core/process/ProcessArguments";
import BucketId from "../id/BucketId";
import IBucket from "../entities/IBucket";
import IBucketGateway from "./IBucketGateway";
import MakeBucketArgumentList from "./MakeBucketArgumentList";
import MakeBucketProcessParser from "./MakeBucketProcessParser";
import StorjBucketPath from "../value-objects/StorjBucketPath";
import ListArgumentsList from "./ListArgumentsList";
import BucketNotFoundException from "./BucketNotFoundException";
import ListBucketsProcessParser from "./ListBucketsProcessParser";

export default class BucketGateway implements IBucketGateway {
	private static readonly UPLINK_COMMAND = "uplink";

	private readonly makeBucketParser: MakeBucketProcessParser;
	private readonly listBucketsParser: ListBucketsProcessParser;

	constructor() {
		this.makeBucketParser = new MakeBucketProcessParser();
		this.listBucketsParser = new ListBucketsProcessParser();
	}

	async create(name: IFileName): Promise<IBucket> {
		const path = new StorjBucketPath(name);
		const result = await this.spawnProcess(
			new MakeBucketArgumentList(path)
		);
		return this.makeBucketParser.parse(result);
	}

	private spawnProcess(args: ArgumentList) {
		return Context.processRunner.spawn(
			new ProcessArguments(BucketGateway.UPLINK_COMMAND, args)
		);
	}

	async findById(id: BucketId): Promise<IBucket> {
		const result = await this.spawnProcess(new ListArgumentsList());
		const buckets = this.listBucketsParser.parse(result);
		return this.findBucketWithIdFromAllBuckets(id, buckets);
	}

	private findBucketWithIdFromAllBuckets(id: BucketId, buckets: IBucket[]) {
		const bucketWithId = buckets.find((bucket) => bucket.id.equals(id));
		if (!bucketWithId) {
			throw new BucketNotFoundException(id);
		}
		return bucketWithId;
	}
}
