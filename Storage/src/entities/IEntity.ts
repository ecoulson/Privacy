import ICloneable from "../utility/ICloneable";
import IEquatable from "../utility/IEquatable";
import IId from "../id/IId";

export default interface IEntity extends ICloneable<IEntity>, IEquatable<IEntity> {
    get id(): IId
}
