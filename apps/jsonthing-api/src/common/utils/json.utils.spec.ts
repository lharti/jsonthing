import { toJson } from './index'

describe('toJson', () => {
    it('should convert a stringified JSON to a JSON object', () => {
        expect.assertions(1)

        const jsonString = `[{"test":"test"}]`

        expect(toJson(jsonString)).toMatchInlineSnapshot(`
            [
              {
                "test": "test",
              },
            ]
        `)
    })

    it('should return the original value if value is not a valid json string', () => {
        expect.assertions(1)

        const invalidJsonString = `{test: "test"`

        expect(toJson(invalidJsonString)).toMatchInlineSnapshot(
            `"{test: "test""`,
        )
    })
})
