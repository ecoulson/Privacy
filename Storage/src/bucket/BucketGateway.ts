import Context from "../Context";
import IFileName from "../core/file/IFileName";
import ArgumentList from "../os/ArgumentList";
import ProcessArguments from "../os/ProcessArguments";
import BucketId from "./BucketId";
import IBucket from "./IBucket";
import IBucketGateway from "./IBucketGateway";
import MakeBucketArgumentList from "./MakeBucketArgumentList";
import MakeBucketProcessParser from "./MakeBucketProcessParser";
import StorjBucketPath from "./StorjBucketPath";

export default class BucketGateway implements IBucketGateway {
	private static readonly UPLINK_COMMAND = "uplink";

	private readonly makeBucketParser: MakeBucketProcessParser;

	constructor() {
		this.makeBucketParser = new MakeBucketProcessParser();
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

	findById(id: BucketId): Promise<IBucket> {
		throw new Error("Method not implemented.");
	}
}
