import { InvalidPayloadError } from "../errors/invalidPayloadError";

export function assertString(
  value: unknown,
  field: string
): asserts value is string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new InvalidPayloadError(`${field} must be a non-empty string`, field);
  }
}

export function assertNumber(
  value: unknown,
  field: string
): asserts value is number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new InvalidPayloadError(`${field} must be a number`, field);
  }
}

export function assertPositive(
  value: number,
  field: string
) {
  if (value <= 0) {
    throw new InvalidPayloadError(`${field} must be greater than 0`, field);
  }
}

export function assertUrl(
  value: string,
  field: string
) {
  try {
    new URL(value);
  } catch {
    throw new InvalidPayloadError(`${field} must be a valid URL`, field);
  }
}
