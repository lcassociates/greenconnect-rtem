export function extractHeaderLine(rawText) {
  const lines = rawText.replace(/\r\n/g, "\n").split("\n").map(l => l.trim());
  const header = lines.find(l => l.length > 0);
  return header ?? "";
}
