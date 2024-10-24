'use client'

import { DocEditor } from '@/components/DocEditor'
import { useGetDoc } from '@/hooks/useGetDoc'
import React from 'react'

interface DocPageProps {
    id: string
}

export const DocPage: React.FC<DocPageProps> = ({ id }) => {
    const { data } = useGetDoc(id)

    return (
        <>
            <DocEditor
                initialContent={data?.content}
                initialTitle={data?.name}
                docId={id}
            />
        </>
    )
}
