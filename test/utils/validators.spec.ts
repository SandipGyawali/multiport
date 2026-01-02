import { InvalidPayloadError } from "../../src/errors/invalidPayloadError";
import { 
  assertNumber, 
  assertPositive, 
  assertString, 
  assertUrl 
} from "../../src/utils/validators";
import { describe, it, expect, beforeEach, mock } from "bun:test"


// input validators tests

/**
 * Test cases describing assertString() utility validator
 */
describe("assertString()", () => {  
  it("passes for a valid string", () => {
    expect(() => assertString("Hello", "Name")).not.toThrow();
  });

  it("throws if value is undefined", () => {
    expect(() => assertString(undefined, "name"))
      .toThrow(InvalidPayloadError);
  });

  it("throws if value is empty string", () => {
    expect(() => assertString("", "name"))
      .toThrow("name must be a non-empty string");
  });

  it("throws if value is not a string", () => {
    expect(() => assertString(123, "name"))
      .toThrow(InvalidPayloadError);
  });
});

describe("assertUrl()", () => {
  it("passes for valid URL", () => {
    expect(() =>
      assertUrl("https://example.com", "success_url")
    ).not.toThrow();
  });

  it("throws for invalid URL", () => {
    expect(() =>
      assertUrl("not-a-url", "success_url")
    ).toThrow("success_url must be a valid URL");
  });

});


describe("assertNumber()", () => {
  it("does not throw for a valid number", () => {
    expect(() => {
      assertNumber(10, "amount");
    }).not.toThrow();
  });

  it("does not throw for zero", () => {
    expect(() => {
      assertNumber(0, "tax_amount");
    }).not.toThrow();
  });

  it("throws InvalidPayloadError for undefined", () => {
    expect(() => {
      assertNumber(undefined, "amount");
    }).toThrow(InvalidPayloadError);
  });

  it("throws InvalidPayloadError for null", () => {
    expect(() => {
      assertNumber(null, "amount");
    }).toThrow(InvalidPayloadError);
  });

  it("throws InvalidPayloadError for string", () => {
    expect(() => {
      assertNumber("100", "amount");
    }).toThrow(InvalidPayloadError);
  });

  it("throws InvalidPayloadError for NaN", () => {
    expect(() => {
      assertNumber(NaN, "amount");
    }).toThrow(InvalidPayloadError);
  });

  it("throws with correct error message", () => {
    expect(() => {
      assertNumber("abc", "total_amount");
    }).toThrow("total_amount must be a number");
  });

  it("throws with correct field name", () => {
    try {
      assertNumber("abc", "total_amount");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPayloadError);
      if (error instanceof InvalidPayloadError) {
        expect(error.field).toBe("total_amount");
      }
    }
  });
});