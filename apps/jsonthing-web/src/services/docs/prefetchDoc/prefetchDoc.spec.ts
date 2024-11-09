import { apiClient } from '@/lib/api-client'
import { prefetchDoc } from './index'

jest.mock('@/lib/api-client')

const setupTestMocks = () => {
    const apiClientMock = jest.mocked(apiClient)

    apiClientMock.get.mockResolvedValueOnce({
        data: 'DOC_DATA',
    })

    const queryResult = {
        current: null,
    }

    const queryClient = {
        prefetchQuery: jest.fn(async ({ queryFn }) => {
            queryResult.current = await queryFn()
        }),
    }

    return {
        prefetchQuery: queryClient.prefetchQuery,
        queryClient,
        queryResult,

        apiClientMock,
    }
}

describe('prefetchDoc', () => {
    it('should setup prefetchQuery', async () => {
        expect.assertions(1)

        const { queryClient, prefetchQuery } = setupTestMocks()

        // @ts-expect-error - just a mock
        await prefetchDoc('DOC_ID', queryClient)

        expect(prefetchQuery).toHaveBeenCalledExactlyOnceWith({
            queryKey: ['doc', 'DOC_ID'],

            queryFn: expect.any(Function),
        })
    })

    it('should prefetch doc', async () => {
        expect.assertions(2)

        process.env.INT_API_URL = 'INT_API_URL'
        const { queryClient, queryResult, apiClientMock } = setupTestMocks()

        // @ts-expect-error - just a mock
        await prefetchDoc('DOC_ID', queryClient)

        expect(apiClientMock.get).toHaveBeenCalledWith('/docs/DOC_ID', {
            baseURL: 'INT_API_URL',
        })

        expect(queryResult.current).toBe('DOC_DATA')
    })
})
