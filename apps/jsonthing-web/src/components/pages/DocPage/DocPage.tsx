'use client'

import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import { DocEditor } from '@/components/DocEditor'
import { useGetDoc } from '@/hooks/useGetDoc'
import React from 'react'

interface DocPageProps {
    id: string
}

export const DocPage: React.FC<DocPageProps> = ({ id }) => {
    const { data } = useGetDoc(id)

    return (
        <article
            className={`
              container mx-auto max-w-screen-md px-4

              md:px-2
            `}
        >
            <header className="mb-12 mt-3 flex">
                <CreateNewDocButton className="ml-auto" />
            </header>

            <main>
                <DocEditor
                    initialContent={data?.content}
                    initialTitle={data?.name}
                    docId={id}
                />
            </main>
        </article>
    )
}
