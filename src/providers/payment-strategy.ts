import type { EsewaPaymentRequest, EsewaPaymentStatusCheck } from "../types";


export interface EsewaPaymentStrategy {
  initiatePayment(input?: Partial<EsewaPaymentRequest>): Promise<string>;
  verifyPayment?(transactionId: string): Promise<boolean>;
  checkPaymentStatus?(props: Pick<EsewaPaymentStatusCheck, "product_code" | "total_amount" | "transaction_uuid"> )
    : Promise<EsewaPaymentStatusCheck>;
}

export interface PaymentStrategy {
  initiatePayment?(input?: Partial<EsewaPaymentRequest>): Promise<string>;
  verifyPayment?(transactionId: string): Promise<boolean>;
  checkPaymentStatus?(props: Pick<EsewaPaymentStatusCheck, "product_code" | "total_amount" | "transaction_uuid"> )
    : Promise<EsewaPaymentStatusCheck>;
}