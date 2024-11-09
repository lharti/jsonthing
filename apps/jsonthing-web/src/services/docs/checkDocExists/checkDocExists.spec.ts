import { checkDocExists } from './index'

const setupTestMocks = () => {
    process.env.INT_API_URL = 'INT_API_URL'

    // eslint-disable-next-line jest/prefer-spy-on
    global.fetch = jest.fn()

    const fetchMock = jest.mocked(global.fetch)

    // return doc exists by default
    // @ts-expect-error - just a mock
    fetchMock.mockResolvedValue({
        ok: true,
    })

    const returnDocDoesNotExist = () => {
        // @ts-expect-error - just a mock
        fetchMock.mockResolvedValue({
            ok: false,
        })
    }

    return {
        fetchMock,
        returnDocDoesNotExist,
    }
}

describe('checkDocExists', () => {
    it('should check if doc exists', async () => {
        expect.assertions(1)

        const { fetchMock } = setupTestMocks()

        await checkDocExists('DOC_ID')

        expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
            'INT_API_URL/docs/DOC_ID',

            {
                method: 'HEAD',
            },
        )
    })

    it('should return true if doc exists', async () => {
        expect.assertions(1)

        setupTestMocks()

        const result = await checkDocExists('DOC_ID')

        expect(result).toBeTrue()
    })

    it('should return false if doc does not exist', async () => {
        expect.assertions(1)

        const { returnDocDoesNotExist } = setupTestMocks()

        returnDocDoesNotExist()

        const result = await checkDocExists('DOC_ID')

        expect(result).toBeFalse()
    })
})
