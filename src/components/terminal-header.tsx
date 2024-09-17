'use client';

import { useTheme } from '@/providers/theme-provider';

import { TerminalContainer } from '@/components/terminal-container';

export const TerminalHeader = () => {
  const { theme } = useTheme();

  if (theme !== 'terminal') return null;

  return (
    <TerminalContainer>
      <header className="gap-1 px-4 horizontal center-v">
        <h1 className="font-bold text-channel-icon">echochat</h1>
      </header>
    </TerminalContainer>
  );
};
