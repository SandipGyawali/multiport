import type { EsewaPaymentStatusCheck } from "../types";

export interface PaymentStrategy {
  initiatePayment?(amount: number): Promise<string>;
  verifyPayment?(transactionId: string): Promise<boolean>;
  checkPaymentStatus?(props: Pick<EsewaPaymentStatusCheck, "product_code" | "total_amount" | "transaction_uuid"> )
    : Promise<EsewaPaymentStatusCheck>;
}