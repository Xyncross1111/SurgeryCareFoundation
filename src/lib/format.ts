/** Format a number as Indian Rupee (INR) with locale grouping. */
export function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN");
}
