// Author: Evan Coulson

import IBucket from "./IBucket";
import ICommand from "../commands/ICommand";
import { IBucketName } from "./IBucketName";

export default class MakeBucketCommand implements ICommand<IBucket> {
	private readonly name: IBucketName;

	constructor(name: IBucketName) {
		this.name = name;
	}

	async execute(): Promise<IBucket> {
		return {
			name: "",
		};
	}
}
