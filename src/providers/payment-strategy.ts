export interface PaymentStrategy {
  initiatePayment(amount: number): Promise<string>;
  verifyPayment(transactionId: string): Promise<boolean>;
}