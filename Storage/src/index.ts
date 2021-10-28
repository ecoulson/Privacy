import MakeBucketCommand from "./bucket/commands/MakeBucketCommand";
import BucketGateway from "./bucket/gateway/BucketGateway";
import StorjBucketName from "./bucket/value-objects/StorjBucketName";
import Context from "./Context";
import ArgumentList from "./os/ArgumentList";
import ProcessRunner from "./os/ProcessRunner";

class Main {
	static async main(args: ArgumentList) {
		Context.bucketGateway = new BucketGateway();
		Context.processRunner = new ProcessRunner();

		const command = new MakeBucketCommand(
			new StorjBucketName(args.getArgument(2))
		);
		try {
			const bucket = await command.execute();
			console.log("Created bucket", bucket.name.value);
		} catch (error) {
			console.log(error);
		}
	}
}

Main.main(new ArgumentList(process.argv));
