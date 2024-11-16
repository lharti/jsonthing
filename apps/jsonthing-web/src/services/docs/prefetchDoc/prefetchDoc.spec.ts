import { fetchDoc } from '../fetchDoc'
import { prefetchDoc } from './index'

jest.mock('../fetchDoc')

const setupTestMocks = () => {
    const fetchDocMock = jest.mocked(fetchDoc)

    fetchDocMock.mockResolvedValueOnce('{DOC_DATA}')

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

        fetchDocMock,
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
        const { queryClient, queryResult, fetchDocMock } = setupTestMocks()

        // @ts-expect-error - just a mock
        await prefetchDoc('DOC_ID', queryClient)

        expect(fetchDocMock).toHaveBeenCalledWith('DOC_ID')

        expect(queryResult.current).toBe('{DOC_DATA}')
    })
})
