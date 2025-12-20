import { PaymentProvider } from "../enums/paymentProviders";
import { EsewaPayment, EsewaPaymentTest } from "./esewa";
import { KhaltiPayment } from "./khalti";
import type { PaymentStrategy } from "./payment-strategy";


type ProviderMap = {
  [PaymentProvider.esewaTest]: EsewaPaymentTest
  [PaymentProvider.esewa]: EsewaPayment;
  [PaymentProvider.khalti]: PaymentProvider;
  [PaymentProvider.khaltiTest]: PaymentProvider
}

export class PaymentFactory {
  static getProvider<P extends PaymentProvider>(provider: P): ProviderMap[P]  {
    switch(provider) {
      case PaymentProvider.esewa: 
        return new EsewaPayment() as ProviderMap[P];
      case PaymentProvider.khalti: 
        return new KhaltiPayment() as ProviderMap[P];
      case PaymentProvider.esewaTest: 
        return new EsewaPaymentTest() as ProviderMap[P];
      // case PaymentProvider.khaltiTest
      default: 
        throw new Error("Unsupported Payment Provider");
    }
  }
}