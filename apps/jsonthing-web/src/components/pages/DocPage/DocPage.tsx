'use client'

import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import { DocEditor } from '@/components/DocEditor'
import { DocEndpoint } from '@/components/DocEndpoint'
import { useGetDoc } from '@/hooks/useGetDoc'
import { startHolyLoader, stopHolyLoader } from 'holy-loader'
import React from 'react'

interface DocPageProps {
    id: string
}

export const DocPage: React.FC<DocPageProps> = ({ id }) => {
    const { data } = useGetDoc(id)

    return (
        <article
            className={`
              mx-auto max-w-screen-md px-4

              md:px-2
            `}
        >
            <header className="mb-12 mt-3 flex flex-wrap-reverse">
                <DocEndpoint
                    docId={id}
                    className={`
                      mt-4 w-full

                      sm:mt-0 sm:w-auto
                    `}
                />

                <CreateNewDocButton
                    className="ml-auto"
                    onPending={() => startHolyLoader()}
                    onError={() => stopHolyLoader()}
                >
                    {'New Doc'}
                </CreateNewDocButton>
            </header>

            <main>
                <DocEditor
                    initialContent={data?.contentText}
                    initialTitle={data?.title}
                    docId={id}
                />
            </main>
        </article>
    )
}
