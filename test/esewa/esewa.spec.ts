import { describe, it, expect, beforeEach, mock, spyOn } from "bun:test";
import { 
  EsewaPaymentStatus, 
  EsewaPaymentTest ,
  type EsewaPaymentStatusCheck, 
} from "../../src/index";

describe("EsewaPaymentTest", () => {
  const esewa = new EsewaPaymentTest();  
  
  beforeEach(() => {
    mock.clearAllMocks();
  });

  it("should return payment status data when API responds successfully", async () => {
    const uuid = crypto.randomUUID();
    const mockResponse: EsewaPaymentStatusCheck = {
      product_code: "EPAYTEST",
      transaction_uuid: uuid,
      total_amount: 2260,
      status: EsewaPaymentStatus.COMPLETE,
      ref_id: "000DD13",
    };

    /**
     * Mock Fetch Globally
     */
    const spyFetch = spyOn(globalThis, "fetch");
    spyFetch.mockResolvedValueOnce(Response.json({ ...mockResponse }));
    
    const result = await esewa.checkPaymentStatus({
      product_code: "EPAY_TEST",
      transaction_uuid: uuid,
      total_amount: 100
    });

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw an error on error response", async () => {
    const spyFetch = spyOn(globalThis, "fetch");
    spyFetch.mockRejectedValueOnce(new Error(`Http error! status: ${500}`));
    
    const uuid = crypto.randomUUID();
    const response = esewa.checkPaymentStatus({
      product_code: "EPAY_TEST",
      transaction_uuid: uuid,
      total_amount: 100
    });

    await expect(response).rejects.toThrow("Http error! status: 500");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
})