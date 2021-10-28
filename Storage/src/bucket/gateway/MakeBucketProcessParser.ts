import Assert from "../../core/assert/Assert";
import IProcessResult from "../../os/IProcessResult";
import IBucket from "../entities/IBucket";
import IProcessParser from "./IProcessParser";
import StorjBucket from "../entities/StorjBucket";
import StorjBucketName from "../value-objects/StorjBucketName";
import IllegalOutputFormatException from "./IllegalOutputFormatException";

export default class MakeBucketProcessParser
	implements IProcessParser<IBucket>
{
	private static readonly OUTPUT_PATTERN = /^Bucket (.*) created\n$/gm;

	parse(result: IProcessResult): IBucket {
		this.assertParsableResult(
			result,
			MakeBucketProcessParser.OUTPUT_PATTERN
		);
		const extractedName = this.extractBucketName(result);
		const bucketName = new StorjBucketName(extractedName);
		return new StorjBucket(bucketName);
	}

	private assertParsableResult(result: IProcessResult, pattern: RegExp) {
		Assert.patternMatches(
			pattern,
			result.output,
			new IllegalOutputFormatException(result, pattern)
		);
	}

	private extractBucketName(result: IProcessResult) {
		return result.output.split(" ")[1];
	}
}
