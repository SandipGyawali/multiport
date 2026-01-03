import type { PaymentModeType } from "../constants/payment-mode";
import { 
  PAYMENT_PROVIDER,
} from "../constants/payment-provider";
import { InvalidPaymentProviderError } from "../errors/invalidPaymentProviderError";
import { ProviderNotFoundError } from "../errors/providerNotFoundError";
import { Esewa } from "./esewa";
import { Khalti } from "./khalti";


type ProviderMap = {
  [PAYMENT_PROVIDER.esewa]: Esewa;
  [PAYMENT_PROVIDER.khalti]: Khalti;
}

type AnyProvider = ProviderMap[keyof ProviderMap];

// extract type field from provider instance
type ProviderType<P extends readonly AnyProvider[]> = P[number]["type"]

// map provider `type` -> concrete class
type ProviderInstance<
  P extends readonly AnyProvider[],
  T extends ProviderType<P>
> = Extract<P[number], { type: T }>


export class PaymentProvider<P extends readonly AnyProvider[]> {
  private providers: P;
  private mode: PaymentModeType;

  static create<P extends readonly AnyProvider[]>({ providers, mode }: { providers: P; mode: PaymentModeType }) {
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

  constructor({ providers, mode }: { providers: P; mode: PaymentModeType }) {
    this.providers = providers;
    this.mode = mode;
  }

  createPayment<T extends ProviderType<P>>(
    { provider }: 
    { provider: T }
  ): ProviderInstance<P, T> {
    const providerInstance = this.providers.find(
      (p) => p.type === provider
    );

    if (!providerInstance)
      throw new ProviderNotFoundError(provider);

    return providerInstance as ProviderInstance<P, T>;
  }
}