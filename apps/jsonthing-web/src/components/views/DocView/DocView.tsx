'use client'

import { DocEditor } from '@/components/DocEditor'
import { useGetDoc } from '@/hooks/useGetDoc'
import React from 'react'

interface DocViewProps {
    id: string
}

export const DocView: React.FC<DocViewProps> = ({ id }) => {
    const { data } = useGetDoc(id)

    return (
        <div>
            <DocEditor
                initialContent={data?.content}
                initialTitle={data?.name}
                docId={id}
            />
        </div>
    )
}
