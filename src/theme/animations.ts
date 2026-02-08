import { keyframes } from '@emotion/react';

export const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 245, 212, 0.4);
  }
  50% {
    box-shadow: 0 0 20px 4px rgba(0, 245, 212, 0.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 245, 212, 0);
  }
`;

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const copyFlash = keyframes`
  0% {
    background-color: rgba(0, 245, 212, 0.3);
  }
  100% {
    background-color: transparent;
  }
`;
