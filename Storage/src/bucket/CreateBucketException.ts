export default class CreateBucketException extends Error {
	public name: string = "CreateBucketException";
	public message: string =
		"Failed to create bucket because an error occured while spawning the process";
}
