import { assertString, assertNumber, assertPositive } from "../utils/validators";
import { InvalidPayloadError } from "../errors/invalidPayloadError";

export const KhaltiValidators = {
  validateVerify(payload: unknown) {
    if (typeof payload !== "object" || payload === null) {
      throw new InvalidPayloadError("Payload must be an object");
    }
    const data = payload as any;
    assertString(data.pidx, "pidx");
    return data;
  },

  validateRefund(payload: unknown) {
    if (typeof payload !== "object" || payload === null) {
      throw new InvalidPayloadError("Payload must be an object");
    }
    const data = payload as any;
    assertString(data.transaction_id, "transaction_id");
    if (data.amount !== undefined) assertNumber(data.amount, "amount");
    if (data.mobile !== undefined) assertString(data.mobile, "mobile");
    return data;
  },
};
