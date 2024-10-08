import { apiClient } from '@/lib/api-client'
import { useMutation } from '@tanstack/react-query'

export const useCreateDoc = () => {
    const mutation = useMutation({
        mutationFn: () => {
            return apiClient.post('/docs')
        },
    })

    return {
        createDoc: mutation.mutate,
        ...mutation,
    }
}
