import { PaymentProvider } from "../enums/paymentProviders";
import { EsewaPayment, EsewaPaymentTest } from "./esewa";
import { KhaltiPayment } from "./khalti";
import type { PaymentStrategy } from "./payment-strategy";

export class PaymentFactory {
  static getProvider(provider: PaymentProvider): PaymentStrategy  {
    switch(provider) {
      case PaymentProvider.esewa: 
        return new EsewaPayment();
      case PaymentProvider.khalti: 
        return new KhaltiPayment();
      case PaymentProvider.esewaTest: 
        return new EsewaPaymentTest();
      // case PaymentProvider.khaltiTest
      default: 
        throw new Error("Unsupported Payment Provider");
    }
  }
}