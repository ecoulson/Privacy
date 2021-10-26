import ICloneable from "../interfaces/ICloneable";
import IId from "../id/IId";
import ISameable from "../interfaces/ISameable";

export default interface IEntity extends ICloneable<IEntity>, ISameable {
	get id(): IId;
}
