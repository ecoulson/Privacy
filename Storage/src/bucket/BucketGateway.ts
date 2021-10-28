import IFileName from "../core/file/IFileName";
import BucketId from "./BucketId";
import IBucket from "./IBucket";
import IBucketGateway from "./IBucketGateway";

export default class BucketGateway implements IBucketGateway {
	create(name: IFileName): Promise<IBucket> {
		throw new Error("Method not implemented.");
	}

	findById(id: BucketId): Promise<IBucket> {
		throw new Error("Method not implemented.");
	}
}
