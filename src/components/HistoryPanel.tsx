/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { HistoryEntry } from '../types';
import { slideIn } from '../theme/animations';

interface HistoryPanelProps {
  entries: HistoryEntry[];
  onClear: () => void;
}

function relativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function HistoryPanel({ entries, onClear }: HistoryPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (value: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {
      // Clipboard API may fail
    }
  };

  if (entries.length === 0) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 1,
          userSelect: 'none',
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
          History ({entries.length})
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {expanded && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              sx={{ color: 'rgba(255,255,255,0.3)', '&:hover': { color: '#ff006e' } }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
          <ExpandMoreIcon
            sx={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.4)',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </Box>
      </Box>
      {expanded && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {entries.map((entry, idx) => (
            <Box
              key={entry.timestamp + idx}
              onClick={() => handleCopy(entry.value, idx)}
              css={css`animation: ${slideIn} 0.2s ease-out;`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1.5,
                py: 1,
                borderRadius: '10px',
                backgroundColor: copiedIdx === idx ? 'rgba(0, 245, 212, 0.1)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.06)',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.7)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                  mr: 1,
                }}
              >
                {entry.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: copiedIdx === idx ? '#00f5d4' : 'rgba(255,255,255,0.3)',
                  flexShrink: 0,
                  fontWeight: copiedIdx === idx ? 600 : 400,
                }}
              >
                {copiedIdx === idx ? 'Copied!' : relativeTime(entry.timestamp)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
