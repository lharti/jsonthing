import { apiClient } from '@/lib/api-client'
import { QueryClient } from '@tanstack/react-query'

export const prefetchDoc = (id: string, queryClient: QueryClient) =>
    queryClient.prefetchQuery({
        queryKey: ['doc', id],

        queryFn: () =>
            apiClient
                .get(`/docs/${id}`)

                .then(res => res.data),
    })
