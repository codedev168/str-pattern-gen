/**
 * Generates random strings based on a pattern with customizable tokens.
 * @packageDocumentation
 */

/**
 * Options for generating strings with custom tokens.
 */
export interface GenerateOptions {
  /**
   * Custom tokens to use in the pattern. Each key must be a single character,
   * and the value is the set of characters to choose from.
   * @remarks Multi-character keys will cause an error during generation.
   */
  customTokens?: { [token: string]: string };
}

const DEFAULT_TOKENS = {
  A: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  a: 'abcdefghijklmnopqrstuvwxyz',
  #: '0123456789',
};

/**
 * Generates a random string based on the provided pattern.
 * @param pattern - The pattern string containing tokens (e.g., 'A#A#-####').
 * @param options - Optional configuration, including custom tokens.
 * @returns The generated random string.
 * @throws {Error} If a token's character set is empty or if a custom token key is not a single character.
 */
export function generateStringFromPattern(pattern: string, options: GenerateOptions = {}): string {
  const { customTokens = {} } = options;

  // Validate custom token keys are single characters
  for (const token of Object.keys(customTokens)) {
    if (token.length !== 1) {
      throw new Error(`Custom token key must be a single character, got: ${token}`);
    }
  }

  const mergedTokens = { ...DEFAULT_TOKENS, ...customTokens };
  let result = '';

  for (const char of pattern) {
    const tokenSet = mergedTokens[char];
    if (tokenSet) {
      if (tokenSet.length === 0) {
        throw new Error(`Token set for '${char}' is empty.`);
      }
      const randomIndex = Math.floor(Math.random() * tokenSet.length);
      result += tokenSet[randomIndex];
    } else {
      result += char;
    }
  }

  return result;
}