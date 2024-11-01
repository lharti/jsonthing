import {
    DEFAULT_DOC_CONTENT,
    DEFAULT_DOC_NAME,
} from '@/routes/docs/constants'
import { docsModel } from '@/routes/docs/model/doc.schema'
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose from 'mongoose'
import { Doc } from '../model'
import { DocsService } from './docs.service'

const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i

const testingModuleMetadata = {
    providers: [
        DocsService,

        {
            provide: getModelToken(Doc.name),
            useValue: docsModel,
        },
    ],
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockingoose = require('mockingoose')

describe('docsService', () => {
    let testingModule: TestingModule
    let docsService: DocsService

    beforeAll(async () => {
        testingModule = await Test.createTestingModule(
            testingModuleMetadata,
        ).compile()

        docsService = testingModule.get<DocsService>(DocsService)
    })

    beforeEach(() => {
        mockingoose.resetAll()
    })

    afterAll(async () => {
        await testingModule.close()
    })

    describe('createDoc', () => {
        it('should create a new doc with payload data', async () => {
            expect.assertions(1)

            const random = Math.random().toString()
            const createDocPayload = {
                title: `${random}}-name`,
                content: {
                    random: `${random}-content`,
                },
            }

            const result =
                await docsService.createDoc(createDocPayload)

            expect(result).toStrictEqual({
                id: expect.stringMatching(OBJECT_ID_PATTERN),

                ...createDocPayload,
            })
        })

        it('should create a new doc without providing payload', async () => {
            expect.assertions(1)

            const result = await docsService.createDoc()

            const defaultDocValues = {
                title: DEFAULT_DOC_NAME,
                content: DEFAULT_DOC_CONTENT,
            }

            expect(result).toStrictEqual({
                id: expect.stringMatching(OBJECT_ID_PATTERN),

                ...defaultDocValues,
            })
        })

        it('should return DatabaseError if the doc creation fails', async () => {
            expect.assertions(1)

            jest.spyOn(docsModel, 'create').mockRejectedValueOnce(
                new Error(),
            )

            const result = docsService.createDoc()

            await expect(result).rejects.toThrow(
                new InternalServerErrorException(
                    `Failed to create doc`,
                ),
            )
        })
    })

    describe('getDocById', () => {
        it('should return a doc by id', async () => {
            expect.assertions(1)

            const doc = {
                title: 'test',
                content: {
                    test: 'test',
                },
            }

            mockingoose(docsModel).toReturn(
                (Query: unknown) => ({
                    ...doc,

                    // @ts-expect-error: trust me
                    _id: Query.getQuery()._id,
                }),

                'findOne',
            )

            const docId = new mongoose.Types.ObjectId()

            const result = await docsService.getDocById(docId)

            expect(result).toStrictEqual({
                id: docId.toString(),

                ...doc,
            })
        })

        it('should throw NotFoundException if doc not found', async () => {
            expect.assertions(1)

            const result = docsService.getDocById(
                new mongoose.Types.ObjectId(),
            )

            await expect(result).rejects.toThrow(
                new NotFoundException('Doc not found'),
            )
        })

        it('should throw InternalServerErrorException if the doc retrieval fails', async () => {
            expect.assertions(1)

            jest.spyOn(docsModel, 'findById').mockRejectedValueOnce(
                new Error(),
            )

            const result = docsService.getDocById(
                new mongoose.Types.ObjectId(),
            )

            await expect(result).rejects.toThrow(
                new InternalServerErrorException(`Failed to get doc`),
            )
        })
    })

    describe('updateDoc', () => {
        it('should update a doc by id', async () => {
            expect.assertions(1)

            const doc = {
                title: 'Old Title',
                content: {
                    test: 'test',
                },
            }

            mockingoose(docsModel).toReturn(
                (Query: unknown) => ({
                    ...doc,
                    // @ts-expect-error: trust me
                    ...Query.getUpdate(),
                    // @ts-expect-error: trust me
                    ...Query.getQuery(),
                }),

                'findOneAndUpdate',
            )

            const docId = new mongoose.Types.ObjectId()

            const result = await docsService.updateDoc(
                docId,

                {
                    title: 'New Title',
                },
            )

            expect(result).toStrictEqual({
                id: docId.toString(),

                ...doc,

                title: 'New Title',
            })
        })

        it('should throw NotFoundException if doc not found', async () => {
            expect.assertions(1)

            const result = docsService.updateDoc(
                new mongoose.Types.ObjectId(),

                {},
            )

            await expect(result).rejects.toThrow(
                new NotFoundException('Doc not found'),
            )
        })

        it('should throw InternalServerErrorException if the doc update fails', async () => {
            expect.assertions(1)

            jest.spyOn(
                docsModel,
                'findByIdAndUpdate',
            ).mockRejectedValueOnce(new Error())

            const result = docsService.updateDoc(
                new mongoose.Types.ObjectId(),

                {},
            )

            await expect(result).rejects.toThrow(
                new InternalServerErrorException(
                    `Failed to update doc`,
                ),
            )
        })
    })
})
