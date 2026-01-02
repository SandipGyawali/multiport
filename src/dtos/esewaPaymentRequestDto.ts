import { InvalidPayloadError } from "../errors/invalidPayloadError";
import {
  assertString,
  assertNumber,
  assertPositive,
  assertUrl,
} from "../utils/validators";

export interface EsewaPaymentRequestDTOProps {
  amount: number;
  tax_amount: number;
  total_amount: number;
  transaction_uuid: string;
  product_code: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;

  product_service_charge?: number;
  product_delivery_charge?: number;
}

export class EsewaPaymentRequestDTO {
  private constructor(public readonly data: EsewaPaymentRequestDTOProps) {}

  static from(payload: unknown): EsewaPaymentRequestDTO {
    if (typeof payload !== "object" || payload === null) {
      throw new InvalidPayloadError("Payload must be an object");
    }

    const data = payload as Partial<EsewaPaymentRequestDTOProps>;

    assertNumber(data.amount, "amount");
    assertPositive(data.amount, "amount");

    assertNumber(data.tax_amount, "tax_amount");
    assertNumber(data.total_amount, "total_amount");

    assertString(data.transaction_uuid, "transaction_uuid");
    assertString(data.product_code, "product_code");

    assertString(data.success_url, "success_url");
    assertUrl(data.success_url, "success_url");

    assertString(data.failure_url, "failure_url");
    assertUrl(data.failure_url, "failure_url");

    assertString(data.signed_field_names, "signed_field_names");
    assertString(data.signature, "signature");

    return new EsewaPaymentRequestDTO({
      amount: data.amount,
      tax_amount: data.tax_amount,
      total_amount: data.total_amount,
      transaction_uuid: data.transaction_uuid,
      product_code: data.product_code,
      success_url: data.success_url,
      failure_url: data.failure_url,
      signed_field_names: data.signed_field_names,
      signature: data.signature,
      product_service_charge: data.product_service_charge,
      product_delivery_charge: data.product_delivery_charge,
    });
  }
}
