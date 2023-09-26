/**
 * Returns object with all query params
 * @param value - URLSearchParams object
 * @returns object with all params
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export function getAllSearchParams(
  value: URLSearchParams
): Record<string, string> {
  return (
    // eslint-disable-next-line unicorn/prefer-spread
    Array.from(value.entries())
      .map((i) => Object.fromEntries([i]))
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce(
        (a, b) => ({
          ...a,
          ...b,
        }),
        {}
      )
  );
}
