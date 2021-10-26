import IFileName from "../file/IFileName";
import IBucket from "./IBucket";

export default interface IBucketGateway {
	save(bucket: IBucket): IBucket;
	create(name: IFileName): IBucket;
}
