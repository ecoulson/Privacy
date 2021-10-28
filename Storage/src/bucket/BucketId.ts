import IFileName from "../core/file/IFileName";
import IId from "../core/id/IId";

export default class BucketId implements IId {
	private readonly bucketName: IFileName;

	constructor(bucketName: IFileName) {
		this.bucketName = bucketName;
	}

	get value(): string {
		return this.bucketName.value;
	}

	equals(other: IId): boolean {
		if (!this.isBucketId(other)) {
			return false;
		}
		return this.value === other.value;
	}

	private isBucketId(id: IId): id is BucketId {
		return id instanceof BucketId;
	}
}
