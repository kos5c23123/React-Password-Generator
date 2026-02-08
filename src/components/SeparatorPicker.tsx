import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SEPARATORS = [
  { label: '-', value: '-' },
  { label: '.', value: '.' },
  { label: 'space', value: ' ' },
  { label: '_', value: '_' },
  { label: 'none', value: '' },
];

interface SeparatorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SeparatorPicker({ value, onChange }: SeparatorPickerProps) {
  return (
    <Box sx={{ py: 1 }}>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.8)',
          mb: 1,
        }}
      >
        Separator
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {SEPARATORS.map((sep) => (
          <Box
            key={sep.label}
            onClick={() => onChange(sep.value)}
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: '20px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '2px solid',
              borderColor: value === sep.value ? '#00f5d4' : 'rgba(255,255,255,0.1)',
              backgroundColor: value === sep.value ? 'rgba(0, 245, 212, 0.1)' : 'transparent',
              color: value === sep.value ? '#00f5d4' : 'rgba(255,255,255,0.6)',
              '&:hover': {
                borderColor: value === sep.value ? '#00f5d4' : 'rgba(255,255,255,0.3)',
              },
            }}
          >
            {sep.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
