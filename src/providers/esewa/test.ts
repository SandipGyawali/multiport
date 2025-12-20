import type { EsewaPaymentStatusCheck } from "../../types";
import type { PaymentStrategy } from "../payment-strategy";

export class EsewaPaymentTest implements PaymentStrategy {
  async initiatePayment(amount: number): Promise<string> {
    return `https://esewa.com/pay?txn`
  }
  
  async verifyPayment(transactionId: string): Promise<boolean> {
    return true;    
  }

  async checkPaymentStatus({
      product_code,
      transaction_uuid,
      total_amount
    }: Pick<EsewaPaymentStatusCheck, "product_code" | "transaction_uuid" | "total_amount">
  ): Promise<EsewaPaymentStatusCheck> {
    const baseUrl = "https://rc.esewa.com.np";

    const url = new URL(`${baseUrl}/api/epay/transaction/status/`);
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
      console.error(errorText)
      throw new Error(`Http error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Payment Status Response', data);
    
    return data as EsewaPaymentStatusCheck;
  }
}