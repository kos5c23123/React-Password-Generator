import { PasswordSettings } from '../types';
import { secureRandomInt, secureShuffle } from './crypto';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const AMBIGUOUS = '0OoIl1|`';

function filterAmbiguous(charset: string): string {
  return charset
    .split('')
    .filter((c) => !AMBIGUOUS.includes(c))
    .join('');
}

function pickRandom(charset: string): string {
  return charset[secureRandomInt(charset.length)];
}

export function generatePassword(settings: PasswordSettings): string {
  const { length, upperCase, lowerCase, numbers, symbols, minNumbers, minSpecial, avoidAmbiguous } =
    settings;

  // Build character pools
  let upperPool = upperCase ? UPPER : '';
  let lowerPool = lowerCase ? LOWER : '';
  let numberPool = numbers ? NUMBERS : '';
  let symbolPool = symbols ? SYMBOLS : '';

  if (avoidAmbiguous) {
    upperPool = filterAmbiguous(upperPool);
    lowerPool = filterAmbiguous(lowerPool);
    numberPool = filterAmbiguous(numberPool);
    symbolPool = filterAmbiguous(symbolPool);
  }

  const fullPool = upperPool + lowerPool + numberPool + symbolPool;

  // Fallback: if no character types selected, use lowercase
  if (fullPool.length === 0) {
    const fallback = avoidAmbiguous ? filterAmbiguous(LOWER) : LOWER;
    const result: string[] = [];
    for (let i = 0; i < length; i++) {
      result.push(pickRandom(fallback));
    }
    return result.join('');
  }

  // Pre-select mandatory characters
  const mandatory: string[] = [];

  if (numbers && numberPool.length > 0) {
    for (let i = 0; i < minNumbers; i++) {
      mandatory.push(pickRandom(numberPool));
    }
  }

  if (symbols && symbolPool.length > 0) {
    for (let i = 0; i < minSpecial; i++) {
      mandatory.push(pickRandom(symbolPool));
    }
  }

  // Fill remaining length from full pool
  const remaining = Math.max(0, length - mandatory.length);
  const chars: string[] = [...mandatory];

  for (let i = 0; i < remaining; i++) {
    chars.push(pickRandom(fullPool));
  }

  // Secure shuffle to randomize mandatory char positions
  return secureShuffle(chars).join('');
}
