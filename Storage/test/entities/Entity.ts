import tap from "tap";
import Entity from "../../src/entities/Entity";
import IEntity from "../../src/entities/IEntity";
import UUID from "../../src/id/UUID";

class TestEntity extends Entity {
	constructor(id: UUID) {
		super(id);
	}

	clone(): IEntity {
		return new TestEntity(this.id as UUID);
	}
}

tap.test("Check that two entities with the same ids are equal", (t) => {
	const entityA = new TestEntity(
		new UUID("fcf73d8a-ef3e-450e-b879-60ebca9ece19")
	);
	const entityB = new TestEntity(
		new UUID("fcf73d8a-ef3e-450e-b879-60ebca9ece19")
	);

	t.ok(entityA.isSame(entityB));
	t.end();
});

tap.test("Check that two entities with different ids are not equal", (t) => {
	const entityA = new TestEntity(
		new UUID("fcf73d8a-ef3e-450e-b879-60ebca9ece19")
	);
	const entityB = new TestEntity(
		new UUID("695220bb-4939-4ab9-81bc-8237dfc3205c")
	);

	t.notOk(entityA.isSame(entityB));
	t.end();
});
