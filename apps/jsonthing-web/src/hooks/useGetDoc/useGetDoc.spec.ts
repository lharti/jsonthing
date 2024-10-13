import { apiClient } from '@/lib/api-client'
import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { useGetDoc } from './index'

jest.mock('@/lib/api-client')
const apiClientMock = jest.mocked(apiClient)

jest.mock('@tanstack/react-query')
const useQueryMock = jest.mocked(useQuery)

describe('useCreateDoc', () => {
    it('should setup get doc query', () => {
        expect.assertions(1)

        const targetId = Math.random().toString()

        renderHook(() => useGetDoc(targetId))

        expect(useQueryMock).toHaveBeenCalledExactlyOnceWith({
            queryKey: ['doc', targetId],
            queryFn: expect.any(Function),
        })
    })

    it('should fetch doc from api', () => {
        expect.assertions(1)

        renderHook(() => useGetDoc('DOC_ID'))

        expect(apiClientMock.get).toHaveBeenCalledWith('/docs/DOC_ID')
    })

    it('should return docs data', async () => {
        expect.assertions(1)

        const apiResponse = { data: Math.random(), status: 201 }

        apiClientMock.get.mockResolvedValueOnce(apiResponse)

        const { result } = renderHook(() => useGetDoc('DOC_ID'))

        await expect(result.current).resolves.toStrictEqual({
            data: apiResponse.data,
        })
    })

    it('should return useQuery function result', () => {
        expect.assertions(1)

        // @ts-expect-error - just for mocking purposes
        useQueryMock.mockReturnValueOnce('USE_QUERY_RESULT')

        const { result } = renderHook(() => useGetDoc('DOC_ID'))

        expect(result.current).toBe('USE_QUERY_RESULT')
    })
})
