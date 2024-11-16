import { fetchDoc } from './index'

const setupTestMocks = () => {
    process.env.INT_API_URL = 'INT_API_URL'

    // eslint-disable-next-line jest/prefer-spy-on
    global.fetch = jest.fn()

    const fetchMock = jest.mocked(global.fetch)

    // @ts-expect-error - just a mock
    fetchMock.mockResolvedValue({
        json: jest.fn().mockResolvedValue('{DOC_DATA}'),
    })

    return {
        fetchMock,
    }
}

describe('fetchDoc', () => {
    it('should fetch doc', async () => {
        expect.assertions(1)

        const { fetchMock } = setupTestMocks()

        await fetchDoc('DOC_ID')

        expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
            'INT_API_URL/docs/DOC_ID',
        )
    })

    it('should return doc data', async () => {
        expect.assertions(1)

        setupTestMocks()

        const result = await fetchDoc('DOC_ID')

        expect(result).toBe('{DOC_DATA}')
    })
})
