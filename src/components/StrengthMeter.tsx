import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StrengthResult } from '../types';

const LEVEL_COLORS: Record<string, string> = {
  weak: '#ff006e',
  medium: '#ffbe0b',
  strong: '#00f5d4',
  'very-strong': '#b8ff00',
};

interface StrengthMeterProps {
  strength: StrengthResult;
}

export default function StrengthMeter({ strength }: StrengthMeterProps) {
  const color = LEVEL_COLORS[strength.level] || LEVEL_COLORS.weak;

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          Strength
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color }}>
          {strength.label}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: `${strength.score}%`,
            height: '100%',
            borderRadius: 4,
            backgroundColor: color,
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
}
