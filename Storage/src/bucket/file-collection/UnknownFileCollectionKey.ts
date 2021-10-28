import IFilePath from "../../core/file/IFilePath";

export default class UnknownFileCollectionKey extends Error {
	constructor(key: IFilePath) {
		super(`Could not find key ${key.value} in collection`);
	}
}
