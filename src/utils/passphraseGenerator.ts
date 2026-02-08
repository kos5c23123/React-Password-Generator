import { PassphraseSettings } from '../types';
import { secureRandomInt } from './crypto';
import wordList from '../dictionary.json';

const words: string[] = Object.values(wordList);

export function generatePassphrase(settings: PassphraseSettings): string {
  const { wordCount, separator, capitalize, includeNumber } = settings;

  const selected: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    let word = words[secureRandomInt(words.length)];
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    selected.push(word);
  }

  let result = selected.join(separator);

  if (includeNumber) {
    result += secureRandomInt(100).toString();
  }

  return result;
}
