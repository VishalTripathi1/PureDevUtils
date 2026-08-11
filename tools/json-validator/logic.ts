export type ValidationResult = { valid: true } | { valid: false; error: string };

export function validateJson(input: string): ValidationResult {
  if (!input.trim()) return { valid: false, error: "Paste JSON to validate it." };
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error.message : "Invalid JSON." };
  }
}
