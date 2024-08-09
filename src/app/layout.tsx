import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { ReactQueryProvider } from '@/providers/react-query-client-provider';
import { ModalRenderer } from '@/lib/modal';

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
    <html lang="en">
      <body
        className={cn(
          'relative flex size-full flex-1 bg-background font-sans text-foreground antialiased',
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <ModalRenderer />
          <Toaster richColors />

          <main className="relative z-0 flex-1 horizontal">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
