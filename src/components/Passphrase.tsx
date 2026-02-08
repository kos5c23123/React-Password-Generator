import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PassphraseSettings } from '../types';
import { generatePassphrase } from '../utils/passphraseGenerator';
import { calculateStrength } from '../utils/strengthCalculator';
import { loadPassphraseSettings, savePassphraseSettings, loadHistory, addToHistory, clearHistory } from '../utils/storage';
import PasswordDisplay from './PasswordDisplay';
import StrengthMeter from './StrengthMeter';
import NumberInput from './NumberInput';
import SettingToggle from './SettingToggle';
import SeparatorPicker from './SeparatorPicker';
import HistoryPanel from './HistoryPanel';

export default function Passphrase() {
  const [settings, setSettings] = useState<PassphraseSettings>(() => loadPassphraseSettings());
  const [passphrase, setPassphrase] = useState(() => generatePassphrase(loadPassphraseSettings()));
  const [history, setHistory] = useState(() => loadHistory('passphrase'));
  const mountedRef = useRef(false);

  // Persist + regenerate on settings change (skip initial mount)
  const settingsKey = JSON.stringify(settings);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    savePassphraseSettings(settings);
    const pp = generatePassphrase(settings);
    setPassphrase(pp);
    addToHistory({ value: pp, timestamp: Date.now(), type: 'passphrase' });
    setHistory(loadHistory('passphrase'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsKey]);

  const generate = useCallback(() => {
    const pp = generatePassphrase(settings);
    setPassphrase(pp);
    addToHistory({ value: pp, timestamp: Date.now(), type: 'passphrase' });
    setHistory(loadHistory('passphrase'));
  }, [settings]);

  const update = <K extends keyof PassphraseSettings>(key: K, value: PassphraseSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const strength = calculateStrength(passphrase);

  const handleClearHistory = () => {
    clearHistory('passphrase');
    setHistory([]);
  };

  return (
    <Box>
      <PasswordDisplay value={passphrase} onRegenerate={generate} />
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

        <NumberInput label="Words" value={settings.wordCount} min={3} max={10} onChange={(v) => update('wordCount', v)} showSlider />
        <SeparatorPicker value={settings.separator} onChange={(v) => update('separator', v)} />

        <Box sx={{ mt: 1, borderTop: '1px solid rgba(255,255,255,0.06)', pt: 1 }}>
          <SettingToggle label="Capitalize Words" checked={settings.capitalize} onChange={(v) => update('capitalize', v)} />
          <SettingToggle label="Include Number" checked={settings.includeNumber} onChange={(v) => update('includeNumber', v)} />
        </Box>
      </Box>

      <HistoryPanel entries={history} onClear={handleClearHistory} />
    </Box>
  );
}
