export class PaymentError extends Error {
  static NAME = "PaymentError"; 
  private code: string;
  private details?: any;  
  
  constructor(message: string, code: string = "PAYMENT_ERROR", details?: any) {
    super(message);
    this.name = PaymentError.NAME;
    this.code = code;
    this.details = details;
  }
}