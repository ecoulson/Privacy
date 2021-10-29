import Context from "../../src/Context";
import InMemoryBucketGateway from "./InMemoryBucketGateway";
import InMemoryProcessRunner from "./InMemoryProcessRunner";

export default class TestContextSetup {
	static setup() {
		Context.bucketGateway = new InMemoryBucketGateway();
		Context.processRunner = new InMemoryProcessRunner();
	}
}
