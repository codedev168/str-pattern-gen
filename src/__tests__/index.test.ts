import { describe, it, expect } from 'vitest';
import { generateStringFromPattern, GenerateOptions } from '../index.js';

describe('generateStringFromPattern', () => {
  it('should generate string with default tokens correctly', () => {
    const result = generateStringFromPattern('A#');
    expect(result.length).toBe(2);
    expect(result[0]).toMatch(/[A-Z]/);
    expect(result[1]).toMatch(/[0-9]/);
  });

  it('should handle custom tokens', () => {
    const options: GenerateOptions = { customTokens: { X: 'a' } };
    const result = generateStringFromPattern('X', options);
    expect(result).toBe('a');
  });

  it('should handle mixed default and custom tokens', () => {
    const options: GenerateOptions = { customTokens: { X: 'x' } };
    const result = generateStringFromPattern('A#X', options);
    expect(result.length).toBe(3);
    expect(result[0]).toMatch(/[A-Z]/);
    expect(result[1]).toMatch(/[0-9]/);
    expect(result[2]).toBe('x');
  });

  it('should leave non-token characters as-is', () => {
    const result = generateStringFromPattern('Hello-World');
    expect(result).toBe('Hello-World');
  });

  it('should handle empty pattern', () => {
    expect(generateStringFromPattern('')).toBe('');
  });

  it('should throw error for empty token set', () => {
    expect(() => generateStringFromPattern('X', { customTokens: { X: '' } }))
      .toThrow("Token set for 'X' is empty.");
  });

  it('should use custom tokens overriding defaults', () => {
    const options: GenerateOptions = { customTokens: { A: 'x' } };
    const result = generateStringFromPattern('A#', options);
    expect(result.length).toBe(2);
    expect(result[0]).toBe('x');
    expect(result[1]).toMatch(/[0-9]/);
  });

  it('should handle multiple instances of same token', () => {
    const options: GenerateOptions = { customTokens: { A: 'x' } };
    const result = generateStringFromPattern('AAAA', options);
    expect(result).toBe('xxxx');
  });

  it('should handle unknown tokens as-is', () => {
    const result = generateStringFromPattern('Z');
    expect(result).toBe('Z');
  });

  it('should handle pattern with all custom tokens', () => {
    const options: GenerateOptions = { customTokens: { X: '1', Y: '2' } };
    const result = generateStringFromPattern('XY', options);
    expect(result).toBe('12');
  });

  it('should handle pattern with multiple non-token characters', () => {
    const result = generateStringFromPattern('abc-123');
    expect(result).toBe('abc-123');
  });
});