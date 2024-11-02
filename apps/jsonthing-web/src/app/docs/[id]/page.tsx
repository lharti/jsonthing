import { DocPage } from '@/components/pages/DocPage'
import { checkDocExists } from '@/services/docs/checkDocExists'
import { prefetchDoc } from '@/services/docs/prefetchDoc'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'

interface DocProps {
    params: Promise<{
        id: string
    }>
}

const Doc = async ({ params }: DocProps) => {
    const { id } = await params

    const docExists = await checkDocExists(id)

    if (!docExists) {
        notFound()
    }

    const queryClient = new QueryClient()

    await prefetchDoc(id, queryClient)

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DocPage id={id} />
        </HydrationBoundary>
    )
}

export default Doc
