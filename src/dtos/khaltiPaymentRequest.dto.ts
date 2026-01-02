import { assertString, assertNumber, assertPositive } from "../utils/validators";
import { InvalidPayloadError } from "../errors/invalidPayloadError";
import type { KhaltiAmountBreakdown, KhaltiCustomerInfo, KhaltiProductDetails } from "../types";

export interface KhaltiPaymentRequestDTOProps {
  return_url: string;
  website_url: string;
  amount: number | string;
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info?: KhaltiCustomerInfo;
  amount_breakdown?: KhaltiAmountBreakdown[];
  product_details?: KhaltiProductDetails[];
  merchant_name?: string;
  merchant_extra?: string;
}

export class KhaltiPaymentRequestDTO {
  constructor(public readonly data: KhaltiPaymentRequestDTOProps) {}

  static from(payload: unknown): KhaltiPaymentRequestDTO {
    if (typeof payload !== "object" || payload === null) {
      throw new InvalidPayloadError("Payload must be an object");
    }

    const data = payload as Partial<KhaltiPaymentRequestDTOProps>;

    // Required fields
    assertString(data.return_url, "return_url");
    assertString(data.website_url, "website_url");
    assertNumber(data.amount, "amount");
    assertPositive(data.amount, "amount");
    assertString(data.purchase_order_id, "purchase_order_id");
    assertString(data.purchase_order_name, "purchase_order_name");

    // Optional nested fields
    if (data.customer_info) {
      const { name, email, phone } = data.customer_info;
      if (name) assertString(name, "customer_info.name");
      if (email) assertString(email, "customer_info.email");
      if (phone) assertString(phone, "customer_info.phone");
    }

    if (data.amount_breakdown) {
      data.amount_breakdown.forEach((item, index) => {
        assertString(item.label, `amount_breakdown[${index}].label`);
        assertNumber(item.amount, `amount_breakdown[${index}].amount`);
      });
    }

    if (data.product_details) {
      data.product_details.forEach((item, index) => {
        assertString(item.identity, `product_details[${index}].identity`);
        assertString(item.name, `product_details[${index}].name`);
        assertNumber(item.total_price, `product_details[${index}].total_price`);
        assertNumber(item.quantity, `product_details[${index}].quantity`);
        assertNumber(item.unit_price, `product_details[${index}].unit_price`);
      });
    }

    // Optional merchant metadata
    if (data.merchant_name) assertString(data.merchant_name, "merchant_name");
    if (data.merchant_extra) assertString(data.merchant_extra, "merchant_extra");

    return new KhaltiPaymentRequestDTO(
      {
        ...data, 
        amount: data.amount.toString()
      } as KhaltiPaymentRequestDTOProps);
  }
}