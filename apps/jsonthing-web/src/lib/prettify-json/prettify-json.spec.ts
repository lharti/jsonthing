import { prettifyJson } from './prettify-json'

describe('prettifyJson', () => {
    it('should return a pretty json string', () => {
        expect.assertions(1)

        const uglyJson = `
        {"string":"John","number":30,
        "object":{"city":"New York",
        "numbers":[1,2,3]}
       , "array":[1,2,3]
        }`

        const prettyJsonResult = prettifyJson(uglyJson)

        expect(prettyJsonResult).toMatchInlineSnapshot(`
            "{
              "string": "John",
              "number": 30,
              "object": {
                "city": "New York",
                "numbers": [
                  1,
                  2,
                  3
                ]
              },
              "array": [
                1,
                2,
                3
              ]
            }"
        `)
    })
})
