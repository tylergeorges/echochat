import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

import { siteConfig } from '@/config/site';
import { fontMono, fontSans } from '@/lib/fonts';

import { TerminalHeader } from '@/components/terminal-header';
import { ModalRenderer } from '@/lib/modal';
import { cn } from '@/lib/utils';
import { ReactQueryProvider } from '@/providers/react-query-client-provider';
import { ThemeProvider } from '@/providers/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: siteConfig.name
  },
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(fontSans.variable, fontMono.variable)}>
      <body className="relative flex size-full h-full flex-1 bg-background font-sans text-foreground antialiased ">
        <ThemeProvider>
          <ReactQueryProvider>
            <ModalRenderer />
            <Toaster richColors />

            <div className="relative size-full flex-1  vertical">
              <TerminalHeader />
              {children}
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
