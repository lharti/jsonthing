import { TooltipProvider } from '@/components/ui/Tooltip'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import React from 'react'
import './globals.css'
import { ReactQueryProvider } from '@/components/ReactQueryProvider'

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
                        <ReactQueryProvider>
                            <div className="">{children}</div>
                        </ReactQueryProvider>
                    </TooltipProvider>
                </ClerkProvider>
            </body>
        </html>
    )
}

export default RootLayout
