import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PasswordSettings } from '../types';
import { generatePassword } from '../utils/passwordGenerator';
import { calculateStrength } from '../utils/strengthCalculator';
import { loadPasswordSettings, savePasswordSettings, loadHistory, addToHistory, clearHistory } from '../utils/storage';
import PasswordDisplay from './PasswordDisplay';
import StrengthMeter from './StrengthMeter';
import NumberInput from './NumberInput';
import SettingToggle from './SettingToggle';
import HistoryPanel from './HistoryPanel';

export default function Password() {
  const [settings, setSettings] = useState<PasswordSettings>(() => loadPasswordSettings());
  const [password, setPassword] = useState(() => generatePassword(loadPasswordSettings()));
  const [history, setHistory] = useState(() => loadHistory('password'));
  const mountedRef = useRef(false);

  // Persist + regenerate on settings change (skip initial mount)
  const settingsKey = JSON.stringify(settings);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    savePasswordSettings(settings);
    const pw = generatePassword(settings);
    setPassword(pw);
    addToHistory({ value: pw, timestamp: Date.now(), type: 'password' });
    setHistory(loadHistory('password'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsKey]);

  const generate = useCallback(() => {
    const pw = generatePassword(settings);
    setPassword(pw);
    addToHistory({ value: pw, timestamp: Date.now(), type: 'password' });
    setHistory(loadHistory('password'));
  }, [settings]);

  const update = <K extends keyof PasswordSettings>(key: K, value: PasswordSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const strength = calculateStrength(password);

  const handleClearHistory = () => {
    clearHistory('password');
    setHistory([]);
  };

  return (
    <Box>
      <PasswordDisplay value={password} onRegenerate={generate} />
      <StrengthMeter strength={strength} />

      <Box
        sx={{
          backgroundColor: '#1a1a2e',
          borderRadius: '16px',
          p: 2.5,
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.4)', mb: 1, letterSpacing: 1, textTransform: 'uppercase' }}>
          Settings
        </Typography>

        <NumberInput label="Length" value={settings.length} min={6} max={128} onChange={(v) => update('length', v)} showSlider />
        <NumberInput label="Min Numbers" value={settings.minNumbers} min={0} max={10} onChange={(v) => update('minNumbers', v)} />
        <NumberInput label="Min Special" value={settings.minSpecial} min={0} max={10} onChange={(v) => update('minSpecial', v)} />

        <Box sx={{ mt: 1, borderTop: '1px solid rgba(255,255,255,0.06)', pt: 1 }}>
          <SettingToggle label="Uppercase (A-Z)" checked={settings.upperCase} onChange={(v) => update('upperCase', v)} />
          <SettingToggle label="Lowercase (a-z)" checked={settings.lowerCase} onChange={(v) => update('lowerCase', v)} />
          <SettingToggle label="Numbers (0-9)" checked={settings.numbers} onChange={(v) => update('numbers', v)} />
          <SettingToggle label="Symbols (!@#$%)" checked={settings.symbols} onChange={(v) => update('symbols', v)} />
          <SettingToggle label="Avoid Ambiguous (0OoIl1|)" checked={settings.avoidAmbiguous} onChange={(v) => update('avoidAmbiguous', v)} />
        </Box>
      </Box>

      <HistoryPanel entries={history} onClear={handleClearHistory} />
    </Box>
  );
}
