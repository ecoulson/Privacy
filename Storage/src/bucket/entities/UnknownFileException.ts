import IFileName from "../../core/file/IFileName";
import IFilePath from "../../core/file/IFilePath";

export default class UnknownFileException extends Error {
	public name: string = "UnknownFileException";

	constructor(bucketName: IFileName, path: IFilePath) {
		super(
			`Can not find file with key ${path.value} in bucket ${bucketName.value}`
		);
	}
}
