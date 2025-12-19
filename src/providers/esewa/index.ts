import type { PaymentStrategy } from "../payment-strategy";

export class EsewaPayment implements PaymentStrategy {
  async initiatePayment(amount: number): Promise<string> {
    return `https://esewa.com/pay?txn`
  }
  
  async verifyPayment(transactionId: string): Promise<boolean> {
    return true;    
  }
}