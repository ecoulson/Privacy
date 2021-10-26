import IBucket from "../../src/bucket/IBucket";
import IBucketGateway from "../../src/bucket/IBucketGateway";
import IFileName from "../../src/file/IFileName";
import InMemoryGatewayUtilities from "./InMemoryGatewayUtilities";

export default class InMemoryBucketGateway
	extends InMemoryGatewayUtilities<IBucket>
	implements IBucketGateway
{
	create(name: IFileName): IBucket {
		throw new Error("Method not implemented.");
	}
}
