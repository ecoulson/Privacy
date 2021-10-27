import IEntity from "../../src/entities/IEntity";

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

	save(entity: T): T {
		this.entities.set(entity.id.value, entity);
		return entity;
	}

	delete(entity: T): void {
		this.entities.delete(entity.id.value);
	}
}
