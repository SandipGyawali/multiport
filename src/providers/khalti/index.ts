import { KhaltiPaymentRequestDTO, type KhaltiPaymentRequestDTOProps } from "../../dtos/khaltiPaymentRequest.dto";
import type { KhaltiPaymentRequest } from "../../types";
import type { KhaltiPaymentInterface, PaymentStrategy } from "../payment-strategy";

export class Khalti implements KhaltiPaymentInterface {
  private BASE_URL = "https://dev.khalti.com/api"; 
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
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