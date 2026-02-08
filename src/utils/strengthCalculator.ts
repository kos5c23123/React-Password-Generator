import { StrengthResult, StrengthLevel } from '../types';

export function calculateStrength(password: string): StrengthResult {
  if (!password) return { score: 0, level: 'weak', label: 'Weak' };

  let score = 0;

  // Length score (0-35 pts)
  const len = password.length;
  if (len >= 32) score += 35;
  else if (len >= 20) score += 28;
  else if (len >= 16) score += 22;
  else if (len >= 12) score += 16;
  else if (len >= 8) score += 10;
  else score += Math.max(0, len * 1.2);

  // Character variety (0-40 pts)
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  const variety = [hasLower, hasUpper, hasNumbers, hasSymbols].filter(Boolean).length;
  score += variety * 10;

  // Mixing bonus (0-15 pts) — alternating character types
  let transitions = 0;
  for (let i = 1; i < password.length; i++) {
    const prevType = charType(password[i - 1]);
    const currType = charType(password[i]);
    if (prevType !== currType) transitions++;
  }
  const mixRatio = password.length > 1 ? transitions / (password.length - 1) : 0;
  score += Math.round(mixRatio * 15);

  // Uniqueness (0-10 pts)
  const uniqueChars = new Set(password).size;
  const uniqueRatio = uniqueChars / password.length;
  score += Math.round(uniqueRatio * 10);

  // Clamp
  score = Math.min(100, Math.max(0, score));

  const level = scoreToLevel(score);
  const label = levelToLabel(level);

  return { score, level, label };
}

function charType(c: string): 'lower' | 'upper' | 'number' | 'symbol' {
  if (/[a-z]/.test(c)) return 'lower';
  if (/[A-Z]/.test(c)) return 'upper';
  if (/[0-9]/.test(c)) return 'number';
  return 'symbol';
}

function scoreToLevel(score: number): StrengthLevel {
  if (score >= 80) return 'very-strong';
  if (score >= 60) return 'strong';
  if (score >= 35) return 'medium';
  return 'weak';
}

function levelToLabel(level: StrengthLevel): string {
  switch (level) {
    case 'very-strong': return 'Very Strong';
    case 'strong': return 'Strong';
    case 'medium': return 'Medium';
    case 'weak': return 'Weak';
  }
}
