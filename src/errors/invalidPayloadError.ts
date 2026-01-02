export class InvalidPayloadError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = "InvalidPayloadError";
  }
}
