import IProcessResults from "../os/IProcessResults";
import IBucket from "./IBucket";
import IProcessParser from "./IProcessParser";

export default class MakeBucketProcessParser
	implements IProcessParser<IBucket>
{
	parse(processResult: IProcessResults): IBucket {
		throw new Error("Method not implemented.");
	}
}
