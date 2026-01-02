import type { EsewaPaymentRequestDTOProps } from "../dtos/esewaPaymentRequestDto";
import type { EsewaPaymentStatusCheck } from "../types";
import { assertNumber, assertPositive, assertString } from "../utils/validators";

export const EsewaValidators = {
  amount(data: Partial<EsewaPaymentRequestDTOProps>) {
    assertNumber(data.amount, "amount");
    assertPositive(data.amount, "amount");
  },
  transaction(data: Partial<EsewaPaymentRequestDTOProps>) {
    assertString(data.transaction_uuid, "transaction_uuid");
  },
  validatePaymentStatus(data: Partial<EsewaPaymentRequestDTOProps>): 
    Pick<EsewaPaymentStatusCheck, "product_code" | "transaction_uuid" | "total_amount"> {
    assertString(data.product_code, "product_code");
    assertString(data.transaction_uuid, "transaction_uuid");
    assertNumber(data.total_amount, "total_amount")
  
    return {
      product_code: data.product_code,
      transaction_uuid: data.transaction_uuid,
      total_amount: data.total_amount
    }
  }
};
