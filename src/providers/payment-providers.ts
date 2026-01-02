import type { PaymentModeType } from "../constants/payment-mode";
import { 
  PAYMENT_PROVIDER,
  type PaymentProviderType, 
} from "../constants/payment-provider";
import { InvalidPaymentProviderError } from "../errors/invalidPaymentProviderError";
import { ProviderNotFoundError } from "../errors/providerNotFoundError";
import { Esewa } from "./esewa";
import { Khalti } from "./khalti";


type ProviderMap = {
  [PAYMENT_PROVIDER.esewa]: Esewa;
  [PAYMENT_PROVIDER.khalti]: Khalti;
}

interface PaymentProviderProps {
  providers: Array<ProviderMap[keyof ProviderMap]>,
  mode: PaymentModeType
}


export class PaymentProvider {
  private providers: Array<ProviderMap[keyof ProviderMap]>;
  private mode: PaymentModeType;

  static create({ providers, mode }: PaymentProviderProps) {
    const provider = new PaymentProvider({ providers, mode });
    
    /**
     * check instances passed in the providers array
     */
    provider.providers.forEach((prov, index) => {         
      if(prov !== null && typeof prov !== "object") 
        throw new InvalidPaymentProviderError(`Provider at index ${index} is not a valid object`);

      if(!(prov.type in PAYMENT_PROVIDER)) 
        throw new InvalidPaymentProviderError(`Unsupported provider type: ${prov.type}`);

      if(prov.type == "esewa" && !(prov instanceof Esewa)) 
        throw new InvalidPaymentProviderError(`Provider type "esewa" must be an instance of Esewa`);

      if(prov.type == "khalti" && !(prov instanceof Khalti)) 
        throw new InvalidPaymentProviderError(`Provider type "khalti" must be an instance of Esewa`);
    });
    
    return provider;
  }

  constructor({ providers, mode }: PaymentProviderProps) {
    this.providers = providers;
    this.mode = mode;
  }

  createPayment<P extends keyof ProviderMap>({ provider }: { provider: P }): ProviderMap[P] {
    const providerInstance = this.providers.find(p => p.type == provider);

    if(!providerInstance) 
      throw new ProviderNotFoundError(provider);

    return providerInstance as ProviderMap[P];
  }
}