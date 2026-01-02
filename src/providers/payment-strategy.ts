import type { KhaltiPaymentRequestDTOProps } from "../dtos/khaltiPaymentRequest.dto";
import type { EsewaPaymentRequest, EsewaPaymentStatusCheck, KhaltiPaymentRequest } from "../types";


export interface EsewaPaymentStrategy {
  initiatePayment(input?: Partial<EsewaPaymentRequest>): Promise<string>;
  verifyPayment?(transactionId: string): Promise<boolean>;
  checkPaymentStatus?(props: Pick<EsewaPaymentStatusCheck, "product_code" | "total_amount" | "transaction_uuid"> )
    : Promise<EsewaPaymentStatusCheck>;
}

export interface KhaltiPaymentInterface {
  initiatePayment(payload: KhaltiPaymentRequest): Promise<any>,
}


export interface PaymentStrategy {
  initiatePayment?(input?: Partial<EsewaPaymentRequest>): Promise<string>;
  verifyPayment?(transactionId: string): Promise<boolean>;
  checkPaymentStatus?(props: Pick<EsewaPaymentStatusCheck, "product_code" | "total_amount" | "transaction_uuid"> )
    : Promise<EsewaPaymentStatusCheck>;
}