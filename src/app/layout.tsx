import type { Metadata } from 'next'

import Navbar from '@/components/layout/navbar'
import WalletProvider from '@/providers/WalletProvider'

import { globalFont, headerFont } from '@/lib/fonts'
import '@/styles/globals.css'
import BottomNav from '@/components/layout/bottomNav'

export const metadata: Metadata = {
  title: 'tucán',
  description: 'plataforma para builders que construyen el futuro',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const NAVBAR_HEIGHT = '64px'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${globalFont.variable} ${headerFont.variable} h-screen`}>
        <WalletProvider>
          <Navbar />
          <main className={`overflow-x-hidden t-[${NAVBAR_HEIGHT}]`}>{children}</main>
        </WalletProvider>
      </body>
    </html>
  )
}
