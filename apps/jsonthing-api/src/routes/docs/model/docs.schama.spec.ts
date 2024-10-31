import { DatabaseError } from '@/common/errors/database.error'
import { DocType } from '@/routes/docs/constants'
import * as mongoose from 'mongoose'
import { Doc, DocSchema, docsModel } from './doc.schema'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockingoose = require('mockingoose')

describe('docSchema', () => {
    beforeEach(() => {
        mockingoose.resetAll()
    })

    it('should define schema object', () => {
        expect.assertions(1)

        expect(DocSchema.obj).toMatchInlineSnapshot(`
            {
              "content": {
                "required": true,
                "type": [Function],
              },
              "name": {
                "minlength": 1,
                "required": true,
                "type": [Function],
              },
              "type": {
                "enum": {
                  "JSON": "json",
                },
                "required": true,
                "type": [Function],
              },
            }
        `)
    })

    it('should define static methods', () => {
        expect.assertions(1)

        expect(DocSchema.statics).toMatchInlineSnapshot(`
            {
              "tryCreate": [Function],
              "tryFindById": [Function],
              "tryFindByIdAndUpdate": [Function],
            }
        `)
    })

    it('should have the right options', () => {
        expect.assertions(1)

        // @ts-expect-error - not defined in mongoose types
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
              "typeKey": "type",
              "validateBeforeSave": true,
              "validateModifiedOnly": false,
              "versionKey": "__v",
            }
        `)
    })

    describe('tryCreate', () => {
        it('should create a new doc', async () => {
            expect.assertions(1)

            const docPayload = {
                name: 'test',
                content: {
                    test: 'test',
                },
                type: DocType.JSON,
            }

            const tryCreateResult = await docsModel
                .tryCreate(docPayload)
                .match(
                    doc => doc,
                    error => error,
                )

            expect(tryCreateResult).toStrictEqual(
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),
                    ...docPayload,
                }),
            )
        })

        it('should return DatabaseError when save fails', async () => {
            expect.assertions(1)

            const docPayload = {
                name: 'test',
                type: 'NOT_A_VALID_TYPE',
            } as unknown as Doc

            const saveError = new mongoose.MongooseError(
                'Failed to create Doc',
            )
            mockingoose(docsModel).toReturn(
                saveError,

                '$save',
            )

            const tryCreateResult = await docsModel
                .tryCreate(docPayload)
                .match(
                    doc => doc,
                    error => error,
                )

            expect(tryCreateResult).toStrictEqual(
                new DatabaseError('Failed to create Doc', saveError),
            )
        })
    })

    describe('tryFindById', () => {
        it('should find a doc by id', async () => {
            expect.assertions(1)

            const targetDoc = {
                _id: new mongoose.Types.ObjectId(),
                name: 'test',
                content: 'test',
                type: DocType.JSON,
            }
            mockingoose(docsModel).toReturn(targetDoc, 'findOne')

            const queryId = new mongoose.Types.ObjectId()

            const result = await docsModel.tryFindById(queryId).match(
                doc => doc?.toJSON(),
                error => error,
            )

            expect(result).toStrictEqual(targetDoc)
        })

        it('should return DatabaseError when findOne fails', async () => {
            expect.assertions(1)

            const queryId = new mongoose.Types.ObjectId()

            const findError = new mongoose.MongooseError(
                'Failed to find Doc',
            )
            mockingoose(docsModel).toReturn(findError, 'findOne')

            const tryFindByIdResult = await docsModel
                .tryFindById(queryId)
                .match(
                    doc => doc,
                    error => error,
                )

            expect(tryFindByIdResult).toStrictEqual(
                new DatabaseError('Failed to find Doc', findError),
            )
        })
    })

    describe('tryFindByIdAndUpdate', () => {
        it('should update a doc by id', async () => {
            expect.assertions(1)

            const targetDoc = {
                _id: new mongoose.Types.ObjectId(),
                name: 'test',
                content: 'test',
                type: DocType.JSON,
            }

            mockingoose(docsModel).toReturn(
                (query: { _update: object }) => {
                    return {
                        ...targetDoc,
                        ...query._update,
                    }
                },

                'findOneAndUpdate',
            )

            const updatePayload = {
                name: 'updated',
            }

            const result = await docsModel
                .tryFindByIdAndUpdate(targetDoc?._id, updatePayload)
                .match(
                    doc => doc?.toJSON(),
                    error => error,
                )

            expect(result).toStrictEqual({
                ...targetDoc,
                ...updatePayload,
            })
        })

        it('should return DatabaseError when findOneAndUpdate fails', async () => {
            expect.assertions(1)

            mockingoose(docsModel).toReturn(
                new Error('something wrong'),
                'findOneAndUpdate',
            )

            const targetId = new mongoose.Types.ObjectId()

            const tryFindByIdAndUpdateResult = await docsModel
                .tryFindByIdAndUpdate(targetId, {})
                .match(
                    doc => doc,
                    error => error,
                )

            expect(tryFindByIdAndUpdateResult).toStrictEqual(
                new DatabaseError(
                    'Failed to find Doc',

                    new Error('something wrong'),
                ),
            )
        })
    })
})
