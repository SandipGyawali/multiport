import { describe, it, expect, beforeEach, mock, spyOn } from "bun:test"
import { Khalti } from "../../src";

describe("KhaltiTest", () => {
  const SECRET_KEY = "FAKE_SECRET_KEY";
  const khalti = new Khalti(SECRET_KEY);

  beforeEach(() => {
    mock.clearAllMocks();
  });

  it("should return payment info for valid pidx", async () => {
    const mockResponse = {
      pidx: "ABC123",
      total_amount: 1000,
      status: "Completed",
      transaction_id: "TXN123",
      fee: 0,
      refunded: false
    };

    const payload = {
      "return_url": "http://example.com/",
      "website_url": "https://example.com/",
      "amount": 1000,
      "purchase_order_id": "Order01",
      "purchase_order_name": "test",
      "customer_info": {
        "name": "Test Bahadur",
        "email": "test@khalti.com",
        "phone": "9800000001"
      }
    }

    /**
     * Mock fetch globally
     */
    const spyFetch = spyOn(globalThis, "fetch");
    spyFetch.mockResolvedValueOnce(Response.json({ ...mockResponse }));

    const result = await khalti.initiatePayment(payload);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  })
});