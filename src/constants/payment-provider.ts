// payment-provider.types.ts
export const PAYMENT_PROVIDER = {
  esewa: "esewa",
  khalti: "khalti",
  fonepay: "fonepay"
} as const;

export type PaymentProviderType =
  typeof PAYMENT_PROVIDER[keyof typeof PAYMENT_PROVIDER];
