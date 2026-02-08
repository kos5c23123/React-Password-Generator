import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

interface NumberInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  showSlider?: boolean;
}

export default function NumberInput({ label, value, min, max, onChange, showSlider = false }: NumberInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = parseInt(e.target.value, 10);
    if (isNaN(v)) v = min;
    v = Math.max(min, Math.min(max, v));
    onChange(v);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1,
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.8)',
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: showSlider ? 1 : 'none' }}>
        {showSlider && (
          <Slider
            value={value}
            onChange={(_, v) => onChange(v as number)}
            min={min}
            max={max}
            sx={{
              color: '#00f5d4',
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                '&:hover, &.Mui-active': {
                  boxShadow: '0 0 12px rgba(0, 245, 212, 0.4)',
                },
              },
              '& .MuiSlider-track': {
                height: 4,
              },
              '& .MuiSlider-rail': {
                height: 4,
                opacity: 0.2,
              },
            }}
          />
        )}
        <Box
          component="input"
          type="number"
          value={value}
          onChange={handleInputChange}
          sx={{
            width: 72,
            height: 40,
            borderRadius: '10px',
            border: '2px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(0,0,0,0.3)',
            color: '#fff',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 15,
            fontWeight: 500,
            textAlign: 'center',
            outline: 'none',
            transition: 'border-color 0.2s',
            '&:focus': {
              borderColor: '#00f5d4',
            },
          }}
        />
      </Box>
    </Box>
  );
}
