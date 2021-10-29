import IProcessResult from "../../os/IProcessResult";
import IBucket from "../entities/IBucket";
import StorjBucket from "../entities/StorjBucket";
import StorjBucketName from "../value-objects/StorjBucketName";
import IProcessParser from "./IProcessParser";

export default class ListBucketsProcessParser
	implements IProcessParser<IBucket[]>
{
	private static readonly BucketPatternRegex =
		/BKT \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} (.*)\n/gm;

	private pattern: RegExp = new RegExp(
		ListBucketsProcessParser.BucketPatternRegex
	);

	parse(processResult: IProcessResult): IBucket[] {
		this.setupPattern();
		return this.getBucketsFromOutput(processResult);
	}

	private setupPattern() {
		this.pattern = new RegExp(ListBucketsProcessParser.BucketPatternRegex);
	}

	private hasMatch(match: RegExpExecArray | null) {
		return match !== null;
	}

	private getBucketsFromOutput(processResult: IProcessResult) {
		const buckets: IBucket[] = [];

		let match = this.processOutput(processResult);
		while (this.hasMatch(match)) {
			buckets.push(this.getBucket(match!));
			match = this.processOutput(processResult);
		}
		return buckets;
	}

	private processOutput(processResult: IProcessResult) {
		return this.pattern.exec(processResult.output);
	}

	private getBucket(match: RegExpExecArray) {
		return new StorjBucket(new StorjBucketName(match[1]));
	}
}
