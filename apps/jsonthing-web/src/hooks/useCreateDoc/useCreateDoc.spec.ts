import { useCreateDoc } from '@/hooks/useCreateDoc/useCreateDoc'
import { apiClient } from '@/lib/api-client'
import { useMutation } from '@tanstack/react-query'

jest.mock('@/lib/api-client')
const apiClientMock = jest.mocked(apiClient)

jest.mock('@tanstack/react-query')
const useMutationMock = jest.mocked(useMutation)

describe('useCreateDoc', () => {
    it('should create new doc in api', () => {
        expect.assertions(1)

        apiClientMock.post.mockResolvedValueOnce({ data: { id: 1 } })

        const { createDoc } = useCreateDoc()

        createDoc()

        expect(apiClientMock.post).toHaveBeenCalledExactlyOnceWith('/docs')
    })

    it('should return createDoc and useMutation function result', () => {
        expect.assertions(1)

        useMutationMock.mockReturnValueOnce({
            // @ts-expect-error just a mock
            mutate: 'MUTATE_FN',
            isError: false,
            isLoading: false,
            others: 'OTHERS',
        })
        const result = useCreateDoc()

        expect(result).toMatchInlineSnapshot(`
            {
              "createDoc": "MUTATE_FN",
              "isError": false,
              "isLoading": false,
              "mutate": "MUTATE_FN",
              "others": "OTHERS",
            }
        `)
    })
})
