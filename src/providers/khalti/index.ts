import type { PaymentModeType } from "../../constants/payment-mode";
import { PAYMENT_PROVIDER } from "../../constants/payment-provider";
import { KhaltiPaymentRequestDTO } from "../../dtos/khaltiPaymentRequest.dto";
import type { KhaltiPaymentRequest } from "../../types";
import type { KhaltiPaymentInterface } from "../payment-strategy";

export class Khalti implements KhaltiPaymentInterface {
  private BASE_URLS = {
    test: "https://rc.esewa.com.np",
    production: "https://epay.esewa.com.np"
  } as const;
  private BASE_URL: string;
  private secretKey: string;
  public type = PAYMENT_PROVIDER.khalti;

  constructor(secretKey: string, mode: PaymentModeType = "test") {
    this.secretKey = secretKey;
    this.BASE_URL = this.BASE_URLS[mode];
    this.type = "khalti";
  }

  async initiatePayment(payload: KhaltiPaymentRequest): Promise<any> {
    const dto = KhaltiPaymentRequestDTO.from(payload); 

    const response = await fetch(`${this.BASE_URL}/v2/epayment/initiate/`, {
      method: "POST",
      headers: {
        Authorization: `key ${this.secretKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...dto.data
      })
    });

    if(!response.ok) throw new Error("Failed to initiate payment");
    const data = await response.json();
    return data;
  };
}