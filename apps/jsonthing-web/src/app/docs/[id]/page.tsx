import { DocView } from '@/components/views/DocView'
import { apiClient } from '@/lib/api-client'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import React from 'react'

interface DocPageProps {
    params: {
        id: string
    }
}

const DocPage = async ({ params }: DocPageProps) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['doc', params.id],

        queryFn: () =>
            apiClient.get(`/docs/${params.id}`).then(res => {
                return res.data
            }),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DocView id={params.id} />
        </HydrationBoundary>
    )
}

export default DocPage
