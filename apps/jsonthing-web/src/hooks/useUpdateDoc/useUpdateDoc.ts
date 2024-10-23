import { apiClient } from '@/lib/api-client'
import { useMutation } from '@tanstack/react-query'

export const useUpdateDoc = () => {
    const mutation = useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string
            payload: {
                content?: string
                name?: string
            }
        }) => {
            return apiClient.patch(`/docs/${id}`, payload)
        },
    })

    return {
        updateDoc: mutation.mutate,
        ...mutation,
    }
}
