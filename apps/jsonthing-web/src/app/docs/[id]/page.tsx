import { DocPage } from '@/components/pages/DocPage'
import { checkDocExists } from '@/services/docs/checkDocExists'
import { fetchDoc } from '@/services/docs/fetchDoc'
import { prefetchDoc } from '@/services/docs/prefetchDoc'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

type Params = Promise<{
    id: string
}>

export async function generateMetadata({
    params,
}: {
    params: Params
}): Promise<Metadata> {
    const { id } = await params

    /**
     * Nextjs will run one fetch for the metadata
     * and for the prefetching of the doc in the page component
     * so no need for me to optimize this fetch
     */
    const doc = await fetchDoc(id)

    return {
        title: `${doc.title} | Jsonthing`,
    }
}

interface DocProps {
    params: Params
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
