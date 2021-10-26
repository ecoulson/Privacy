import ICloneable from "../utility/ICloneable";
import IId from "../id/IId";
import ISameable from "../utility/ISameable";

export default interface IEntity extends ICloneable<IEntity>, ISameable {
	get id(): IId;
}
