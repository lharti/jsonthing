import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import Image from 'next/image'
import React from 'react'

export const LandingPage: React.FC = ({}) => {
    return (
        <div className="mx-auto max-w-screen-xl px-8 pt-32">
            <main
                className={`
                  flex flex-col items-center gap-8

                  lg:flex-row lg:items-start lg:justify-between
                `}
            >
                <div
                    className={`
                      max-w-96 space-y-6 text-center

                      lg:text-start
                    `}
                >
                    <div
                        aria-label="logo"
                        className={`
                          inline rounded-md bg-gradient-to-r from-green-400
                          to-blue-500 px-3 text-3xl text-white
                        `}
                    >
                        {'jsonthing'}
                    </div>

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
                        {`Edit,
                        and access your JSON documents with automatically generated API endpoints.`}
                    </p>

                    <CreateNewDocButton className="px-8 py-6 text-base">
                        {'Create new JSON doc'}
                    </CreateNewDocButton>
                </div>

                <div>
                    <Image
                        className="rounded-md"
                        src="https://storage.googleapis.com/jsonthing-assets/hero.jpeg"
                        alt="jsonthing.com"
                        width={600}
                        height={500}
                    />
                </div>
            </main>
        </div>
    )
}
