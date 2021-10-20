// Author: Evan Coulson
import { IBucketName } from "./IBucketName";
import IBucketPath from "./IBucketPath";

export default interface IBucket {
	get name(): IBucketName;
	get path(): IBucketPath;
}
