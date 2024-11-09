'use server'

import { apiClient } from '@/lib/api-client'
import { QueryClient } from '@tanstack/react-query'

export const prefetchDoc = async (id: string, queryClient: QueryClient) => {
    return await queryClient.prefetchQuery({
        queryKey: ['doc', id],

        queryFn: () =>
            apiClient
                .get(`/docs/${id}`, {
                    baseURL: process.env.INT_API_URL,
                })

                .then(res => res.data),
    })
}
