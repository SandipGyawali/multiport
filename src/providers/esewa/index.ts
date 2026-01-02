import type { PaymentModeType } from "../../constants/payment-mode";
import type { PaymentProviderType } from "../../constants/payment-provider";
import { EsewaPaymentRequestDTO } from "../../dtos/esewaPaymentRequestDto";
import type { 
  EsewaPaymentRequest, 
  EsewaPaymentStatusCheck 
} from "../../types";
import { EsewaValidators } from "../../validators/esewa.validators";
import type { EsewaPaymentStrategy } from "../payment-strategy";

export class Esewa implements EsewaPaymentStrategy {
  private BASE_URLS = {
    test: "https://rc.esewa.com.np",
    production: "https://epay.esewa.com.np"
  } as const;
  private BASE_URL: string;
  public type: PaymentProviderType;

  constructor(mode: PaymentModeType = "test") {
    this.BASE_URL = this.BASE_URLS[mode];
    this.type = "esewa";
  }

  async initiatePayment(payload: Partial<EsewaPaymentRequest> = {}): Promise<string> {
    const dto = EsewaPaymentRequestDTO.from({
      ...payload,
      transaction_uuid:
        payload.transaction_uuid ?? crypto.randomUUID()
    });

    console.log("Valid Payment DTO", dto.data);

    return this.BASE_URL;
  }

  async checkPaymentStatus(payload : Pick<EsewaPaymentStatusCheck, "product_code" | "transaction_uuid" | "total_amount">
  ): Promise<EsewaPaymentStatusCheck> {
    const { product_code, total_amount, transaction_uuid }  = EsewaValidators.validatePaymentStatus({
      product_code: payload.product_code,
      transaction_uuid: payload.transaction_uuid,
      total_amount: payload.total_amount as number
    });

    const url = new URL(`${this.BASE_URL}/api/epay/transaction/status/`);
    url.searchParams.set("product_code", product_code);
    url.searchParams.set("transaction_uuid", transaction_uuid);
    url.searchParams.set("total_amount", total_amount.toString())

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if(!response.ok) {
      const errorText = await response.text();
      console.error(errorText);
      throw new Error(`Http error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Payment Status Response', data);
    
    return data as EsewaPaymentStatusCheck;
  }
}