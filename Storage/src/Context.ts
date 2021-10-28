import IBucketGateway from "./bucket/gateway/IBucketGateway";
import IProcessRunner from "./os/IProcessRunner";

export default class Context {
	public static bucketGateway: IBucketGateway;
	public static processRunner: IProcessRunner;
}
