export class InvalidPaymentProviderError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidPaymentProviderError";
  }
}
