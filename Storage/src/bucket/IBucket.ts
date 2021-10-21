// Author: Evan Coulson
import IEquatable from "../equatable/IEquatable";
import { IBucketName } from "./IBucketName";
import IBucketPath from "./IBucketPath";

export default interface IBucket extends IEquatable<IBucket> {
	get name(): IBucketName;
	get path(): IBucketPath;
	persist(): Promise<IBucket>;
}
