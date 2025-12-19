import type { PaymentStrategy } from "../payment-strategy";

export class KhaltiPayment implements PaymentStrategy {
  async initiatePayment(amount: number): Promise<string> {
    return  `https://khalti.com?amount=${amount};`
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    return true;
  }
}