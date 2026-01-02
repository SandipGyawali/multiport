export const PAYMENT_MODE = {
  test: "test",
  production: "production"
} as const;

export type PaymentModeType =
  typeof PAYMENT_MODE[keyof typeof PAYMENT_MODE];
