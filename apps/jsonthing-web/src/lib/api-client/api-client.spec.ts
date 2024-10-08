import { AxiosInstance } from 'axios'

describe('apiClient', () => {
    let apiClient: AxiosInstance

    // eslint-disable-next-line jest/no-hooks
    beforeAll(async () => {
        process.env.NEXT_PUBLIC_API_URL = `http://${Math.random()}:3000`

        apiClient = (await import('./api-client')).apiClient
    })

    it('should have the right default baseUrl', () => {
        expect.assertions(1)

        expect(apiClient.defaults.baseURL).toBe(process.env.NEXT_PUBLIC_API_URL)
    })

    it('should have the right default headers', () => {
        expect.assertions(1)

        expect(apiClient.defaults.headers['Content-Type']).toBe(
            'application/json',
        )
    })
})
