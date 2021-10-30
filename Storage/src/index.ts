import ArgumentList from "./core/process/ArgumentList";
import StorjAPI from "./storj/StorjAPI";

class Main {
	static async main(args: ArgumentList) {
		const storj = new StorjAPI();
		const bucket = await storj.bucket.createBucket(args.getArgument(2));
		console.log(bucket);
	}
}

Main.main(new ArgumentList(process.argv));
