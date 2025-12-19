/**
 * EsewaPaymentStatus
 * ------------------
 * Represents all possible payment states returned by eSewa
 * during payment verification or status lookup.
 */
export enum EsewaPaymentStatus {
  /** Payment initiated but not completed yet */
  PENDING = "PENDING",

  /** Payment completed successfully */
  COMPLETE = "COMPLETE",

  /** Full amount refunded to the customer */
  FULL_REFUND = "FULL_REFUND",

  /** Partial amount refunded to the customer */
  PARTIAL_REFUND = "PARTIAL_REFUND",

  /** Payment is in a halted/uncertain state */
  AMBIGUOUS = "AMBIGUOUS",

  /** Payment session expired or transaction not found */
  NOT_FOUND = "NOT_FOUND",

  /** Payment canceled or reversed by eSewa */
  CANCELED = "CANCELED",
}
