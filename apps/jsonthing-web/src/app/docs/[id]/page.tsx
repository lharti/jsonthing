import { DocView } from '@/components/views/DocView'
import { apiClient } from '@/lib/api-client'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import React from 'react'

interface DocPageProps {
    params: Promise<{
        id: string
    }>
}

const DocPage = async ({ params }: DocPageProps) => {
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
            <DocView id={id} />
        </HydrationBoundary>
    )
}

export default DocPage
