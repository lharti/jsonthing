import { DocSchema, docsModel } from './doc.schema'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockingoose = require('mockingoose')

describe('docSchema', () => {
    beforeEach(() => {
        mockingoose.resetAll()
    })

    it('should match snapshot', () => {
        expect.assertions(1)

        expect(DocSchema).toMatchSnapshot()
    })

    it('should define schema object', () => {
        expect.assertions(1)

        expect(DocSchema.obj).toMatchInlineSnapshot(`
            {
              "content": {
                "required": true,
                "type": [Function],
              },
              "title": {
                "minlength": 1,
                "required": true,
                "type": [Function],
              },
            }
        `)
    })

    it('should have the right options', () => {
        expect.assertions(1)

        // @ts-expect-error: exists, but not defined in mongoose types
        expect(DocSchema.options).toMatchInlineSnapshot(`
            {
              "_id": true,
              "autoIndex": null,
              "bufferCommands": true,
              "capped": false,
              "discriminatorKey": "__t",
              "id": true,
              "minimize": true,
              "optimisticConcurrency": false,
              "pluralization": true,
              "read": null,
              "shardKey": null,
              "strict": true,
              "strictQuery": false,
              "toJSON": {
                "transform": [Function],
                "virtuals": true,
              },
              "toObject": {
                "transform": [Function],
                "virtuals": true,
              },
              "typeKey": "type",
              "validateBeforeSave": true,
              "validateModifiedOnly": false,
              "versionKey": "__v",
            }
        `)
    })

    describe('toObject', () => {
        it('should return pretty doc', async () => {
            expect.assertions(1)

            const random = Math.random().toString()

            const doc = await docsModel.create({
                title: random,
                content: { test: random },
            })

            expect(doc.toJSON()).toStrictEqual({
                id: doc._id.toString(),

                content: { test: random },
                title: random,
            })
        })
    })

    describe('toJSON', () => {
        it('should return pretty doc', async () => {
            expect.assertions(1)

            const random = Math.random().toString()

            const doc = await docsModel.create({
                title: random,
                content: { test: random },
            })

            expect(doc.toJSON()).toStrictEqual({
                id: doc._id.toString(),

                content: { test: random },
                title: random,
            })
        })
    })
})
