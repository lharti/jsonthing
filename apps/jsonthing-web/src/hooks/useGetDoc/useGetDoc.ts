import { apiClient } from '@/lib/api-client'
import { useQuery } from '@tanstack/react-query'

export const useGetDoc = (id: string) => {
    const result = useQuery({
        queryKey: ['doc', id],

        queryFn: () => apiClient.get(`/docs/${id}`).then(({ data }) => data),
    })

    return result
}
