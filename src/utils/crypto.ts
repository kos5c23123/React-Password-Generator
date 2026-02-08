/**
 * Generate a cryptographically secure random integer in [0, max).
 * Uses rejection sampling to avoid modulo bias.
 */
export function secureRandomInt(max: number): number {
  if (max <= 0) throw new Error('max must be positive');
  if (max === 1) return 0;

  const array = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;

  // Rejection sampling to avoid modulo bias
  let value: number;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value >= limit);

  return value % max;
}

/**
 * Cryptographically secure Fisher-Yates shuffle.
 */
export function secureShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
