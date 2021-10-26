// Author: Evan Coulson
import IBucket from "./IBucket";
import ICommand from "../commands/ICommand";
import IProcessRunner from "../os/IProcessRunner";
import CreateBucketException from "./CreateBucketException";
import StorjBucket from "./StorjBucket";
import StorjBucketName from "./StorjBucketName";
import Context from "../Context";

export default class MakeBucketCommand implements ICommand<IBucket> {
	private readonly name: StorjBucketName;
	private readonly processRunner: IProcessRunner;

	constructor(name: StorjBucketName, processRunner: IProcessRunner) {
		this.name = name;
		this.processRunner = processRunner;
	}

	async execute(): Promise<IBucket> {
		try {
			return await this.makeBucket();
		} catch (error) {
			throw new CreateBucketException();
		}
	}

	private async makeBucket() {
		const bucket = Context.bucketGateway.save(new StorjBucket(this.name));
		await this.spawnProcess();
		return bucket;
	}

	private async spawnProcess() {
		await this.processRunner.spawn({
			command: "",
			arguments: [],
		});
	}
}
