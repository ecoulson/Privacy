import IBucket from "../../src/bucket/IBucket";
import IBucketGateway from "../../src/bucket/IBucketGateway";
import InMemoryGatewayUtilities from "./InMemoryGatewayUtilities";

export default class InMemoryBucketGateway extends InMemoryGatewayUtilities<IBucket> implements IBucketGateway {
    
}