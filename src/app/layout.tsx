import type { Metadata } from 'next';

import Navbar from '@/components/layout/navbar';
import { globalFont, headerFont } from '@/lib/fonts';

import '@/styles/globals.css';

export const metadata = {
  title: 'tucán',
  description: 'plataforma para builders que construyen el futuro',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const NAVBAR_HEIGHT = '64px';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${globalFont.variable} ${headerFont.variable} h-screen`}
      >
        <Navbar />
        <main className={`overflow-x-hidden t-[${NAVBAR_HEIGHT}]`}>
          {children}
        </main>
      </body>
    </html>
  );
}
