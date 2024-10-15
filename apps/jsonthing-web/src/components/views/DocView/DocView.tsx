'use client'

import { JsonEditor } from '@/components/JsonEditor'
import { useGetDoc } from '@/hooks/useGetDoc'
import React from 'react'

interface DocViewProps {
    id: string
}

export const DocView: React.FC<DocViewProps> = ({ id }) => {
    const { data } = useGetDoc(id)

    return (
        <div>
            <JsonEditor initialContent={data?.content} />
        </div>
    )
}
