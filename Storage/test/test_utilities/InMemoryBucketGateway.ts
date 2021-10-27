import IBucket from "../../src/bucket/IBucket";
import IBucketGateway from "../../src/bucket/IBucketGateway";
import StorjBucket from "../../src/bucket/StorjBucket";
import IFileName from "../../src/file/IFileName";
import InMemoryGatewayUtilities from "./InMemoryGatewayUtilities";

export default class InMemoryBucketGateway
	extends InMemoryGatewayUtilities<IBucket>
	implements IBucketGateway
{
	create(name: IFileName): IBucket {
        const bucket = new StorjBucket(name);
		this.save(new StorjBucket(name));
        return bucket
	}
}
