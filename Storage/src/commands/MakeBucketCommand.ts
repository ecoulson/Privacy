// Author: Evan Coulson

import IBucket from "../entities/IBucket";
import ICommand from "./ICommand";

export default class MakeBucketCommand implements ICommand<IBucket> {
	execute(): Promise<IBucket> {
		throw new Error("Method not implemented.");
	}
}
