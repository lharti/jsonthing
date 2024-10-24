import { DocPage } from '@/components/pages/DocPage'
import { apiClient } from '@/lib/api-client'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import React from 'react'

interface DocProps {
    params: Promise<{
        id: string
    }>
}

const Doc = async ({ params }: DocProps) => {
    const { id } = await params

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['doc', id],

        queryFn: () =>
            apiClient.get(`/docs/${id}`).then(res => {
                return res.data
            }),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DocPage id={id} />
        </HydrationBoundary>
    )
}

export default Doc
