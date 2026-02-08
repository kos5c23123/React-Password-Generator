import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Password from './components/Password';
import Passphrase from './components/Passphrase';
import TabSwitcher from './components/TabSwitcher';
import { loadActiveTab, saveActiveTab } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => loadActiveTab());

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    saveActiveTab(tab);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0f',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 3, sm: 5 },
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 22, sm: 26 },
            fontWeight: 700,
            textAlign: 'center',
            mb: 3,
            background: 'linear-gradient(135deg, #00f5d4, #b8ff00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Password Generator
        </Typography>

        <TabSwitcher activeTab={activeTab} onChange={handleTabChange} />

        {activeTab === 'password' ? <Password /> : <Passphrase />}
      </Box>
    </Box>
  );
}
