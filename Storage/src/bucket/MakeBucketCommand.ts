// Author: Evan Coulson
import IBucket from "./IBucket";
import ICommand from "../commands/ICommand";
import { IBucketName } from "./IBucketName";
import IProcessRunner from "../os/IProcessRunner";

export default class MakeBucketCommand implements ICommand<IBucket> {
	private readonly name: IBucketName;
	private readonly processRunner: IProcessRunner;

	constructor(name: IBucketName, processRunner: IProcessRunner) {
		this.name = name;
		this.processRunner = processRunner;
	}

	async execute(): Promise<IBucket> {
		await this.processRunner.spawn({
			command: "",
			arguments: [],
		});
		return {
			name: this.name,
			path: {
				value: `sj://${this.name.value}`,
			},
		};
	}
}
