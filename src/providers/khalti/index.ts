import type { PaymentStrategy } from "../payment-strategy";

export class KhaltiPayment implements PaymentStrategy {
  async verifyPayment(transactionId: string): Promise<boolean> {
    return true;
  }
}