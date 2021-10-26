export default abstract class InMemoryGatewayUtilities<T> {
	save(entity: T): T {
		return entity;
	}
}
