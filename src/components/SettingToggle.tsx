import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

interface SettingToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingToggle({ label, checked, onChange }: SettingToggleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 0.75,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        {label}
      </Typography>
      <Switch
        checked={checked}
        onChange={(_, v) => onChange(v)}
        size="small"
      />
    </Box>
  );
}
