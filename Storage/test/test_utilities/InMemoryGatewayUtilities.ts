import IEntity from "../../src/core/entities/IEntity";

export default abstract class InMemoryGatewayUtilities<T extends IEntity> {
	private entities: Map<string, T>;

	constructor() {
		this.entities = new Map<string, T>();
	}

	getAllEntities(): T[] {
		const entities: T[] = [];
		for (const key of this.entities.keys()) {
			entities.push(this.entities.get(key) as T);
		}
		return entities;
	}

	async save(entity: T): Promise<T> {
		this.entities.set(entity.id.value, entity);
		return entity;
	}

	async delete(entity: T): Promise<void> {
		this.entities.delete(entity.id.value);
	}
}
