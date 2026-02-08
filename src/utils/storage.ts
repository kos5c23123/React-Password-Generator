import {
  PasswordSettings,
  PassphraseSettings,
  HistoryEntry,
  DEFAULT_PASSWORD_SETTINGS,
  DEFAULT_PASSPHRASE_SETTINGS,
} from '../types';

const KEYS = {
  passwordSettings: 'pwgen-password-settings',
  passphraseSettings: 'pwgen-passphrase-settings',
  history: 'pwgen-history',
  activeTab: 'pwgen-active-tab',
} as const;

const MAX_HISTORY = 10;

// --- Settings ---

export function loadPasswordSettings(): PasswordSettings {
  try {
    const raw = localStorage.getItem(KEYS.passwordSettings);
    if (!raw) return DEFAULT_PASSWORD_SETTINGS;
    return { ...DEFAULT_PASSWORD_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PASSWORD_SETTINGS;
  }
}

export function savePasswordSettings(settings: PasswordSettings): void {
  localStorage.setItem(KEYS.passwordSettings, JSON.stringify(settings));
}

export function loadPassphraseSettings(): PassphraseSettings {
  try {
    const raw = localStorage.getItem(KEYS.passphraseSettings);
    if (!raw) return DEFAULT_PASSPHRASE_SETTINGS;
    return { ...DEFAULT_PASSPHRASE_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PASSPHRASE_SETTINGS;
  }
}

export function savePassphraseSettings(settings: PassphraseSettings): void {
  localStorage.setItem(KEYS.passphraseSettings, JSON.stringify(settings));
}

// --- History ---

export function loadHistory(type: 'password' | 'passphrase'): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.history);
    if (!raw) return [];
    const all: HistoryEntry[] = JSON.parse(raw);
    return all.filter((e) => e.type === type).slice(0, MAX_HISTORY);
  } catch {
    return [];
  }
}

export function addToHistory(entry: HistoryEntry): void {
  try {
    const raw = localStorage.getItem(KEYS.history);
    const all: HistoryEntry[] = raw ? JSON.parse(raw) : [];

    // Add to front
    all.unshift(entry);

    // Keep max per type
    const passwords = all.filter((e) => e.type === 'password').slice(0, MAX_HISTORY);
    const passphrases = all.filter((e) => e.type === 'passphrase').slice(0, MAX_HISTORY);

    localStorage.setItem(KEYS.history, JSON.stringify([...passwords, ...passphrases]));
  } catch {
    // Silently fail
  }
}

export function clearHistory(type: 'password' | 'passphrase'): void {
  try {
    const raw = localStorage.getItem(KEYS.history);
    if (!raw) return;
    const all: HistoryEntry[] = JSON.parse(raw);
    const remaining = all.filter((e) => e.type !== type);
    localStorage.setItem(KEYS.history, JSON.stringify(remaining));
  } catch {
    // Silently fail
  }
}

// --- Active Tab ---

export function loadActiveTab(): string {
  return localStorage.getItem(KEYS.activeTab) || 'password';
}

export function saveActiveTab(tab: string): void {
  localStorage.setItem(KEYS.activeTab, tab);
}
