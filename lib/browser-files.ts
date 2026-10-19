/** Only local browser APIs; never persist or transmit tool contents. */
export async function copyText(text: string) {
  if (!globalThis.navigator?.clipboard?.writeText) throw new Error("Clipboard unavailable. Select the output and copy it manually.");
  try { await navigator.clipboard.writeText(text); }
  catch { throw new Error("Clipboard access was denied. Select the output and copy it manually."); }
}
export function downloadText(text: string, filename: string, mime = "text/plain") {
  if (!globalThis.URL?.createObjectURL) throw new Error("Downloads unavailable. Copy the output instead.");
  const url = URL.createObjectURL(new Blob([text], { type: `${mime};charset=utf-8` }));
  const link = document.createElement("a");
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
