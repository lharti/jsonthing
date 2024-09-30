import { TooltipProvider } from '@/components/ui/Tooltip'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import React from 'react'
import './globals.css'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
})

export const metadata: Metadata = {
    title: 'Json thing',
    description: '🚀 in progress JSON thing',
}

interface RootLayoutProps {
    children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`
                  ${geistSans.variable}
                  ${geistMono.variable}
                `}
            >
                <ClerkProvider>
                    <TooltipProvider>
                        <div className="container mx-auto max-w-screen-md">
                            {children}
                        </div>
                    </TooltipProvider>
                </ClerkProvider>
            </body>
        </html>
    )
}

export default RootLayout
