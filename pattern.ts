import { Esewa } from "./src/providers/esewa";
import { Khalti } from "./src/providers/khalti";
import { PaymentProvider } from "./src/providers/payment-providers";

// const paymentProvider = PaymentProvider.create({
//   mode: "test",
//   providers: [new Esewa(), new Khalti("live_secret_key_68791341fdd94846a146f0457ff7b455")]
// })

// const esewa = paymentProvider.createPayment({ provider: "esewa" });

// const uuid = crypto.randomUUID();
// const response  = await esewa.checkPaymentStatus({
//   product_code: "EPAY_TEST",
//   transaction_uuid: uuid,
//   total_amount: 100
// });


// const khalti = paymentProvider.createPayment({ provider: "khalti" });
// const paymentResponse = await khalti.initiatePayment({
//   "return_url": "http://example.com/",
//   "website_url": "https://example.com/",
//   "amount": 1000,
//   "purchase_order_id": "Order01",
//   "purchase_order_name": "test",
//   "customer_info": {
//     "name": "Test Bahadur",
//     "email": "test@khalti.com",
//     "phone": "9800000001"
//   }
// })




const paymentProvider = PaymentProvider.create({
  mode: "test",
  providers: [new Esewa()]
});


const esewa = paymentProvider.createPayment({ provider: "esewa" })

const uuid = crypto.randomUUID();
const response  = await esewa.checkPaymentStatus({
  product_code: "EPAY_TEST",
  transaction_uuid: uuid,
  total_amount: 100
});

console.log(response)
