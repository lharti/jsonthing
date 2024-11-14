import { LandingPageHero } from '@/components/pages/LandingPage/LandingPageHero'
import React from 'react'

export const LandingPage: React.FC = ({}) => {
    return (
        <div
            className={`
              mx-auto max-w-screen-xl px-6 pt-32

              2xl:px-0
            `}
        >
            <main>
                <LandingPageHero />
            </main>
        </div>
    )
}
