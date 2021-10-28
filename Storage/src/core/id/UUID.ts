import IId from "./IId";
import { v4 as createRandomUUID, validate } from "uuid";
import IEquatable from "../interfaces/IEquatable";
import IllegalUUIDException from "./IllegalUUIDException";

export default class UUID implements IId, IEquatable<UUID> {
	private _value: string;

	constructor(value: string = createRandomUUID()) {
		this.validateUUID(value);
		this._value = value;
	}

	private validateUUID(value: string) {
		if (!validate(value)) {
			throw new IllegalUUIDException(value);
		}
	}

	get value(): string {
		return this._value;
	}

	equals(other: UUID): boolean {
		return this.value === other.value;
	}
}
