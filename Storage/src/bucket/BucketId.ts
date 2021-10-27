import IFileName from "../file/IFileName";
import IId from "../id/IId";

export default class BucketId implements IId {
	private readonly bucketName: IFileName;

	constructor(bucketName: IFileName) {
		this.bucketName = bucketName;
	}

	get value(): string {
		return this.bucketName.value;
	}

	equals(other: BucketId): boolean {
		return this.bucketName.equals(other.bucketName);
	}
}
