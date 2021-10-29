import IBucket from "../bucket/entities/IBucket";

export default interface IBucketAPI {
	createBucket(name: string): Promise<IBucket>;
}
