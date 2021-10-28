import IFileName from "../../core/file/IFileName";
import BucketId from "../id/BucketId";
import IBucket from "../entities/IBucket";

export default interface IBucketGateway {
	create(name: IFileName): Promise<IBucket>;
	findById(id: BucketId): Promise<IBucket>;
}
