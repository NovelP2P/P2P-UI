// app/layout.tsx
"use client"
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './globals.css'
import Link from 'next/link'
import { Web3Provider,config } from "@/scripts/Web3Provider";
import { ConnectKitButton } from "connectkit";
import { WagmiProvider } from 'wagmi'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Web3Provider>
      <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Toaster/>
        <nav className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="font-bold text-xl text-blue-500">
                P2P Swap
              </Link>
              <div className="flex gap-6 items-center">
                <Link 
                  href="/orderbook" 
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Order Book
                </Link>
                <Link 
                  href="/myorders" 
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  My Orders
                </Link>
                <Link 
                  href="/swaps" 
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Active Swaps
                </Link>
                <ConnectKitButton />
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
    </WagmiProvider>
    </QueryClientProvider>
    </Web3Provider>
  )
}