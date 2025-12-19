import { createHmac } from "crypto"

export function generateHmac<T extends string>(data: T, secretKey: string) {
  return createHmac("sha256", secretKey).update(data).digest("hex");
}

export function verifyHmac<T extends string>(data: T, hmac: string, secretKey: string): boolean {
  const generatedHmac = generateHmac(data, secretKey);
  return generatedHmac === hmac;   
}