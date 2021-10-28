import ArgumentList from "../os/ArgumentList";
import StorjBucketPath from "./StorjBucketPath";

export default class MakeBucketArgumentList extends ArgumentList {
	private static readonly MAKE_BUCKET_ARGUMENT = "mb";

	constructor(path: StorjBucketPath) {
		super([MakeBucketArgumentList.MAKE_BUCKET_ARGUMENT, path.value]);
	}
}
