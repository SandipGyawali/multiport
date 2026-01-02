import { 
  PAYMENT_PROVIDER, 
  type PaymentProviderType 
} from "../constants/payment-provider";
import { Esewa } from "./esewa";
import { Khalti } from "./khalti";


type ProviderMap = {
  [PAYMENT_PROVIDER.esewa]: Esewa;
  [PAYMENT_PROVIDER.khalti]: Khalti;
}

export class PaymentProvider {
  static getProvider<P extends PaymentProviderType>(provider: P): ProviderMap[P]  {
    switch(provider) {
      case PAYMENT_PROVIDER.esewa: 
        return new Esewa() as ProviderMap[P];
      case PAYMENT_PROVIDER.khalti: 
        return new Khalti("live_secret_key_68791341fdd94846a146f0457ff7b455") as ProviderMap[P];
     default: 
        throw new Error("Unsupported Payment Provider");
    }
  }
}