/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { pulseGlow, copyFlash } from '../theme/animations';

interface PasswordDisplayProps {
  value: string;
  onRegenerate: () => void;
}

export default function PasswordDisplay({ value, onRegenerate }: PasswordDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 600);
    return () => clearTimeout(t);
  }, [value]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may fail in some environments
    }
  };

  return (
    <Box
      css={animating ? css`animation: ${pulseGlow} 0.6s ease-out;` : undefined}
      sx={{
        border: '2px solid',
        borderColor: '#00f5d4',
        borderRadius: '20px',
        p: 2,
        mb: 2,
        position: 'relative',
        backgroundColor: 'rgba(0, 245, 212, 0.03)',
      }}
    >
      <Box
        css={copied ? css`animation: ${copyFlash} 0.5s ease-out;` : undefined}
        sx={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: { xs: 14, sm: 16 },
          fontWeight: 500,
          wordBreak: 'break-all',
          lineHeight: 1.6,
          color: '#fff',
          pr: 8,
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '12px',
        }}
      >
        {value}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="left">
          <IconButton
            onClick={handleCopy}
            size="small"
            sx={{
              color: copied ? '#b8ff00' : '#00f5d4',
              transition: 'color 0.2s',
              '&:hover': { backgroundColor: 'rgba(0, 245, 212, 0.1)' },
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Regenerate" placement="left">
          <IconButton
            onClick={onRegenerate}
            size="small"
            sx={{
              color: '#00f5d4',
              '&:hover': {
                backgroundColor: 'rgba(0, 245, 212, 0.1)',
                transform: 'rotate(180deg)',
              },
              transition: 'all 0.3s',
            }}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
