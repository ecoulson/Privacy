// Author: Evan Coulson

import IEntityDTO from "../entities/IEntityDTO";
import IProcessResult from "./IProcessResults";

export default interface IProcessResultMapper {
	map<T extends IEntityDTO>(result: IProcessResult): T;
}
