export class ProviderNotFoundError extends Error {
  constructor(providerType: string) {
    super(`Payment provider "${providerType}" not found or not initialized`);
    this.name = "ProviderNotFoundError";
  }
}
