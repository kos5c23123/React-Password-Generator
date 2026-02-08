export interface PasswordSettings {
  length: number;
  upperCase: boolean;
  lowerCase: boolean;
  numbers: boolean;
  symbols: boolean;
  minNumbers: number;
  minSpecial: number;
  avoidAmbiguous: boolean;
}

export interface PassphraseSettings {
  wordCount: number;
  separator: string;
  capitalize: boolean;
  includeNumber: boolean;
}

export interface HistoryEntry {
  value: string;
  timestamp: number;
  type: 'password' | 'passphrase';
}

export type StrengthLevel = 'weak' | 'medium' | 'strong' | 'very-strong';

export interface StrengthResult {
  score: number;
  level: StrengthLevel;
  label: string;
}

export const DEFAULT_PASSWORD_SETTINGS: PasswordSettings = {
  length: 16,
  upperCase: true,
  lowerCase: true,
  numbers: true,
  symbols: true,
  minNumbers: 1,
  minSpecial: 1,
  avoidAmbiguous: false,
};

export const DEFAULT_PASSPHRASE_SETTINGS: PassphraseSettings = {
  wordCount: 4,
  separator: '-',
  capitalize: true,
  includeNumber: true,
};
