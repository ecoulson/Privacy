// Author: Evan Coulson
import IBucket from "./IBucket";
import ICommand from "../commands/ICommand";
import IProcessRunner from "../os/IProcessRunner";
import CreateBucketException from "./CreateBucketException";
import StorjBucketPath from "./StorjBucketPath";
import Bucket from "./Bucket";
import BucketName from "./BucketName";

export default class MakeBucketCommand implements ICommand<IBucket> {
	private readonly name: BucketName;
	private readonly processRunner: IProcessRunner;

	constructor(name: BucketName, processRunner: IProcessRunner) {
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
		await this.spawnProcess();
		return new Bucket(this.name, new StorjBucketPath(this.name));
	}

	private async spawnProcess() {
		await this.processRunner.spawn({
			command: "",
			arguments: [],
		});
	}
}
