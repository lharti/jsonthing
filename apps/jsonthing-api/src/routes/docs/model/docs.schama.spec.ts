import {
    createDocPayloadFixture,
    docFixture,
} from '@/common/helpers/fixtures/doc.fixtures'
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

            const doc = await docsModel.create(
                createDocPayloadFixture,
            )

            expect(doc.toJSON()).toStrictEqual({
                ...docFixture,

                id: doc._id.toString(),
            })
        })
    })

    describe('toJSON', () => {
        it('should return pretty doc', async () => {
            expect.assertions(1)

            const doc = await docsModel.create(
                createDocPayloadFixture,
            )

            expect(doc.toJSON()).toStrictEqual({
                ...docFixture,
                id: doc._id.toString(),
            })
        })
    })
})
