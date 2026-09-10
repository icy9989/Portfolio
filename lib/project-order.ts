/** Numeric IDs are newest first; legacy nonnumeric IDs precede them so ID 1 stays last. */
export function compareProjectIds(a: { id: string }, b: { id: string }): number {
  const aNumeric = /^\d+$/.test(a.id);
  const bNumeric = /^\d+$/.test(b.id);
  if (aNumeric && bNumeric) {
    const left = BigInt(a.id);
    const right = BigInt(b.id);
    return left === right ? a.id.localeCompare(b.id) : left > right ? -1 : 1;
  }
  if (aNumeric !== bNumeric) return aNumeric ? 1 : -1;
  return a.id.localeCompare(b.id);
}
