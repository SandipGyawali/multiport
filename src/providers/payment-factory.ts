import { PaymentProvider } from "../enums/payment-providers.enum";
import { EsewaPayment } from "./esewa";
import { KhaltiPayment } from "./khalti";
import type { PaymentStrategy } from "./payment-strategy";

export class PaymentFactory {
  static getProvider(provider: string): PaymentStrategy  {
    switch(provider.toLowerCase()) {
      case PaymentProvider.esewa: 
        return new EsewaPayment();
      case PaymentProvider.khalti: 
        return new KhaltiPayment();
      default: 
        throw new Error("Unsupported Payment Provider");
    }
  }
}