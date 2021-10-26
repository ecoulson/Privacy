import IBucket from "./IBucket";

export default interface IBucketGateway {
	save(bucket: IBucket): IBucket;
}
