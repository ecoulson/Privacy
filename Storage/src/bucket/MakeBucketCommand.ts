// Author: Evan Coulson
import IBucket from "./IBucket";
import ICommand from "../commands/ICommand";
import { IBucketName } from "./IBucketName";
import IProcessRunner from "../os/IProcessRunner";
import CreateBucketException from "./CreateBucketException";
import StorjBucketPath from "./StorjBucketPath";
import Bucket from "./Bucket";

export default class MakeBucketCommand implements ICommand<IBucket> {
	private readonly name: IBucketName;
	private readonly processRunner: IProcessRunner;

	constructor(name: IBucketName, processRunner: IProcessRunner) {
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
