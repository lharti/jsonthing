import { ReactQueryProvider } from '@/components/ReactQueryProvider'
import { useCreateDoc } from '@/hooks/useCreateDoc/useCreateDoc'
import { apiClient } from '@/lib/api-client'
import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react'

jest.mock('@/lib/api-client')

const apiClientMock = jest.mocked(apiClient)

describe('useCreateDoc', () => {
    it('should create new doc in api', async () => {
        expect.assertions(2)

        apiClientMock.post.mockResolvedValueOnce({ data: { id: 1 } })

        const { result } = renderHook(() => useCreateDoc(), {
            wrapper: ReactQueryProvider,
        })

        act(() => {
            result.current.createDoc()
        })

        await waitFor(() => {
            expect(apiClientMock.post).toHaveBeenCalledExactlyOnceWith('/docs')
        })
    })

    it('should return api response on success', async () => {
        expect.assertions(3)

        const postResponse = { data: Math.random(), status: 201 }

        apiClientMock.post.mockResolvedValueOnce(postResponse)

        const { result } = renderHook(() => useCreateDoc(), {
            wrapper: ReactQueryProvider,
        })

        act(() => {
            result.current.createDoc()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTrue()
        })

        expect(result.current.data).toStrictEqual(postResponse)
    })

    it('should return api error on failure', async () => {
        expect.assertions(3)

        const error = new Error('Test Error')

        apiClientMock.post.mockRejectedValueOnce(error)

        const { result } = renderHook(() => useCreateDoc(), {
            wrapper: ReactQueryProvider,
        })

        act(() => {
            result.current.createDoc()
        })

        await waitFor(() => {
            expect(result.current.isError).toBeTrue()
        })

        expect(result.current.error).toStrictEqual(error)
    })

    it('should return useMutation function result', () => {
        expect.assertions(1)

        const { result } = renderHook(() => useCreateDoc(), {
            wrapper: ReactQueryProvider,
        })

        expect(result.current).toMatchInlineSnapshot(`
            {
              "context": undefined,
              "createDoc": [Function],
              "data": undefined,
              "error": null,
              "failureCount": 0,
              "failureReason": null,
              "isError": false,
              "isIdle": true,
              "isPaused": false,
              "isPending": false,
              "isSuccess": false,
              "mutate": [Function],
              "mutateAsync": [Function],
              "reset": [Function],
              "status": "idle",
              "submittedAt": 0,
              "variables": undefined,
            }
        `)
    })
})
