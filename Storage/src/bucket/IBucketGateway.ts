import IFileName from "../core/file/IFileName";
import BucketId from "./BucketId";
import IBucket from "./IBucket";

export default interface IBucketGateway {
	create(name: IFileName): Promise<IBucket>;
	findById(id: BucketId): Promise<IBucket>;
}
