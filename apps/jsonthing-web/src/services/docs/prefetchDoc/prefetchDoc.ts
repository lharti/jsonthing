'use server'

import { QueryClient } from '@tanstack/react-query'
import { fetchDoc } from '../fetchDoc'

export const prefetchDoc = async (id: string, queryClient: QueryClient) => {
    return await queryClient.prefetchQuery({
        queryKey: ['doc', id],

        queryFn: () => fetchDoc(id),
    })
}
