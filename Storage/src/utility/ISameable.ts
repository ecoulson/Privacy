import IEntity from "../entities/IEntity";

export default interface ISameable {
	isSame(entity: IEntity): boolean;
}
