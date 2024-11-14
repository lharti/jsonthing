import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PropsWithClassName {
    className?: string
}

const LandingPageLogo: React.FC<PropsWithClassName> = ({ className }) => (
    <Link
        href="/"
        aria-label="jsonthing logo"
        className={cn(
            `
              inline-block rounded-md bg-gradient-to-r from-green-400
              to-blue-500 px-3 py-1 text-2xl font-semibold text-white shadow-lg
            `,

            className,
        )}
    >
        {'jsonthing'}
    </Link>
)

export { LandingPageLogo }

const LandingPageHeroDetails: React.FC<PropsWithClassName> = ({
    className,
}) => {
    return (
        <div className={cn(`space-y-6`, className)}>
            <LandingPageLogo />

            <h1
                aria-label=""
                className={`
                  text-4xl font-bold

                  md:text-5xl
                `}
            >
                {'JSON storage that speaks API.'}
            </h1>

            <p className="text-xl text-gray-600">
                {`Edit, and access your JSON documents with automatically generated API endpoints.`}
            </p>

            <CreateNewDocButton className="px-8 py-6 text-base">
                {'Create new JSON doc'}
            </CreateNewDocButton>
        </div>
    )
}

export const LandingPageHero: React.FC<PropsWithClassName> = ({
    className,
}) => {
    return (
        <section
            className={cn(
                `
                  flex flex-col items-center gap-8

                  lg:flex-row lg:items-start lg:justify-between
                `,

                className,
            )}
        >
            <LandingPageHeroDetails
                className={`
                  max-w-96 text-center

                  lg:text-start
                `}
            />

            <Image
                unoptimized
                src="https://storage.googleapis.com/jsonthing-assets/hero.png"
                alt="jsonthing hero"
                width={700}
                height={600}
                className={`
                  mt-0

                  lg:mt-12
                `}
            />
        </section>
    )
}
