import { useUpdateDoc } from '@/hooks/useUpdateDoc/useUpdateDoc'
import { apiClient } from '@/lib/api-client'
import { useMutation } from '@tanstack/react-query'

jest.mock('@/lib/api-client')
const apiClientMock = jest.mocked(apiClient)

jest.mock('@tanstack/react-query')
const useMutationMock = jest.mocked(useMutation)

describe('useCreateDoc', () => {
    it('should setup update doc mutation', () => {
        expect.assertions(1)

        useUpdateDoc()

        expect(useMutationMock).toHaveBeenCalledExactlyOnceWith({
            mutationFn: expect.any(Function),
        })
    })

    it('should create new doc in api', () => {
        expect.assertions(1)

        const targetId = Math.random().toString()
        const payload = { content: `New Content ${Math.random()}` }

        const { updateDoc } = useUpdateDoc()

        updateDoc({
            id: targetId,

            payload,
        })

        expect(apiClientMock.patch).toHaveBeenCalledExactlyOnceWith(
            `/docs/${targetId}`,

            payload,
        )
    })

    it('should return updateDoc and useMutation function result', () => {
        expect.assertions(1)

        useMutationMock.mockReturnValueOnce({
            // @ts-expect-error - just for mocking purposes
            mutate: 'mutateFn',
            data: 'data',
            isSuccess: true,
        })

        const result = useUpdateDoc()

        expect(result).toMatchInlineSnapshot(`
            {
              "data": "data",
              "isSuccess": true,
              "mutate": "mutateFn",
              "updateDoc": "mutateFn",
            }
        `)
    })
})
