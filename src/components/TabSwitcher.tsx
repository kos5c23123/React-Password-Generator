import React from 'react';
import Box from '@mui/material/Box';

interface TabSwitcherProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const TABS = [
  { key: 'password', label: 'Password' },
  { key: 'passphrase', label: 'Passphrase' },
];

export default function TabSwitcher({ activeTab, onChange }: TabSwitcherProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '16px',
        p: 0.5,
        mb: 3,
      }}
    >
      {TABS.map((tab) => (
        <Box
          key={tab.key}
          onClick={() => onChange(tab.key)}
          sx={{
            flex: 1,
            textAlign: 'center',
            py: 1.25,
            px: 3,
            borderRadius: '13px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: activeTab === tab.key ? '#0a0a0f' : 'rgba(255,255,255,0.5)',
            backgroundColor: activeTab === tab.key ? '#00f5d4' : 'transparent',
            '&:hover': activeTab !== tab.key
              ? { color: 'rgba(255,255,255,0.8)' }
              : {},
          }}
        >
          {tab.label}
        </Box>
      ))}
    </Box>
  );
}
