export const MAX_UUID_QUANTITY = 1000;
export function validateQuantity(value: string | number): number {
  if (!/^\d+$/.test(String(value))) throw new Error("Enter a whole-number quantity from 1 to 1,000.");
  const quantity = Number(value);
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > MAX_UUID_QUANTITY) throw new Error("Choose between 1 and 1,000 UUIDs per batch.");
  return quantity;
}
export function generateUuid(): string {
  if (!globalThis.crypto?.randomUUID) throw new Error("Secure UUID generation is unavailable. Use a current browser over HTTPS (or localhost).");
  return crypto.randomUUID();
}
export function generateUuids(quantity: string | number): string[] {
  return Array.from({ length: validateQuantity(quantity) }, () => generateUuid());
}
export function serializeUuids(values: string[], format: "txt" | "csv") {
  return format === "csv" ? `uuid\r\n${values.join("\r\n")}\r\n` : values.join("\n");
}
