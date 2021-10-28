export default class ProcessError {
	private readonly name: string;
	private readonly message: string;

	constructor(name: string, message: string) {
		this.name = name;
		this.message = message;
	}

	format(): string {
		return `${this.name}: ${this.message}\n\n`;
	}
}
