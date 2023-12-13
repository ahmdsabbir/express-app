export default class Resp {
	public message: string;
	public value: any;

	constructor(message: string, value: any) {
		this.message = message;
		this.value = value;
	}
}