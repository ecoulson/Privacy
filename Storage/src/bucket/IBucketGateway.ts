import IFileName from "../file/IFileName";
import BucketId from "./BucketId";
import IBucket from "./IBucket";

export default interface IBucketGateway {
	save(bucket: IBucket): IBucket;
	create(name: IFileName): IBucket;
	findById(id: BucketId): IBucket;
}
