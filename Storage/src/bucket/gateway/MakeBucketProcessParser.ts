import Assert from "../../core/assert/Assert";
import IProcessResult from "../../os/IProcessResults";
import IBucket from "../entities/IBucket";
import IProcessParser from "./IProcessParser";
import StorjBucket from "../entities/StorjBucket";
import StorjBucketName from "../value-objects/StorjBucketName";

export default class MakeBucketProcessParser
	implements IProcessParser<IBucket>
{
	parse(result: IProcessResult): IBucket {
		this.assertParsableResult(result);
		const extractedName = this.extractBucketName(result);
		const bucketName = new StorjBucketName(extractedName);
		return new StorjBucket(bucketName);
	}

	private assertParsableResult(result: IProcessResult) {
		Assert.patternMatches(
			new RegExp(/^Bucket .* created$/),
			result.output,
			new Error(
				`Output is not in expected format. Output was ${result.output}`
			)
		);
	}

	private extractBucketName(result: IProcessResult) {
		return result.output.split(" ")[1];
	}
}
