import IId from "../id/IId";
import IEntity from "./IEntity";

export default abstract class Entity implements IEntity {
	private _id: IId;

	constructor(id: IId) {
		this._id = id;
	}

	get id(): IId {
		return this._id;
	}

	abstract clone(): IEntity;

	equals(other: IEntity): boolean {
		return this.id.equals(other.id);
	}
}
