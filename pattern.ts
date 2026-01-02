// 1. Strategy Design Pattern
// 2. Factory Pattern
// 3. Unified Gateway Service

import { PaymentProvider } from "./src";

// import { KhaltiTest, PaymentProvider, PaymentProviders } from "./src/index";

// const payload = {
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
// }
    

// const khalti = PaymentProviders.getProvider(PaymentProvider.khaltiTest)
// const result = await khalti.initiatePayment(payload);
// console.log(result)



const uuid = crypto.randomUUID();


const esewa = PaymentProvider.getProvider("esewa");

const result = await esewa.checkPaymentStatus({
  product_code: "EPAY_TEST",
  transaction_uuid: uuid,
  total_amount: 100
});


console.log(result)