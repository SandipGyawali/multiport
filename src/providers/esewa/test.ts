import type { 
  EsewaPaymentRequest, 
  EsewaPaymentStatusCheck 
} from "../../types";
import type { EsewaPaymentStrategy } from "../payment-strategy";

export class EsewaPaymentTest implements EsewaPaymentStrategy {
  async initiatePayment({ 
    amount, 
    failure_url, 
    product_code, 
    product_delivery_charge, 
    product_service_charge, 
    signature, 
    signed_field_names, 
    success_url, 
    tax_amount, 
    total_amount, 
    transaction_uuid
  }: Partial<EsewaPaymentRequest> = {}): Promise<string> {
    if(!transaction_uuid) transaction_uuid = crypto.randomUUID();

    console.log(transaction_uuid);
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
      console.error(errorText);
      throw new Error(`Http error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Payment Status Response', data);
    
    return data as EsewaPaymentStatusCheck;
  }
}