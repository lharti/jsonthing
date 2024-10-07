import { DatabaseError } from '@/common/errors/database.error'
import {
    DEFAULT_DOC_CONTENT,
    DEFAULT_DOC_NAME,
    DocType,
} from '@/routes/docs/constants'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose from 'mongoose'
import { errAsync, okAsync } from 'neverthrow'
import { Doc, DocsModel } from '../model'
import { DocsService } from './docs.service'

const testingModuleMetadata = {
    providers: [
        DocsService,
        {
            provide: getModelToken(Doc.name),
            useValue: {
                tryCreate: jest.fn(tryCreatePayload =>
                    okAsync({
                        _id: new mongoose.Types.ObjectId(),
                        ...tryCreatePayload,
                    }),
                ),

                tryFindById: jest.fn(docId =>
                    okAsync({
                        _id: docId,
                        name: 'test',
                        content: 'test',
                        type: DocType.JSON,
                    }),
                ),

                tryFindByIdAndUpdate: jest.fn((id, updatePayload) =>
                    okAsync({
                        _id: id,
                        name: 'test',
                        content: 'test',
                        type: DocType.JSON,
                        ...updatePayload,
                    }),
                ),
            },
        },
    ],
}

describe('docsService', () => {
    let testingModule: TestingModule
    let docsService: DocsService
    let docsModel: jest.Mocked<DocsModel>

    beforeAll(async () => {
        testingModule = await Test.createTestingModule(
            testingModuleMetadata,
        ).compile()

        docsService = testingModule.get<DocsService>(DocsService)

        docsModel = testingModule.get(getModelToken(Doc.name))
    })

    afterAll(async () => {
        await testingModule.close()
    })

    describe('tryCreateDoc', () => {
        it('should create a new doc with payload data', async () => {
            expect.assertions(1)

            const createDocPayload = {
                name: `${Math.random}-name`,
                content: `${Math.random}-content`,
            }

            const result = await docsService
                .tryCreateDoc(createDocPayload)
                .unwrapOr(null)

            expect(result).toStrictEqual(
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),

                    ...createDocPayload,

                    type: DocType.JSON,
                }),
            )
        })

        it('should create a new doc without providing payload', async () => {
            expect.assertions(1)

            const result = await docsService
                .tryCreateDoc({})
                .unwrapOr(null)

            const defaultDocValues = {
                name: DEFAULT_DOC_NAME,
                content: DEFAULT_DOC_CONTENT,
            }

            expect(result).toStrictEqual(
                expect.objectContaining({
                    _id: expect.any(mongoose.Types.ObjectId),

                    ...defaultDocValues,

                    type: DocType.JSON,
                }),
            )
        })

        it('should return DatabaseError if the doc creation fails', async () => {
            expect.assertions(1)

            const databaseError = new DatabaseError(
                'Failed to create Doc',
                new mongoose.Error('something went wrong'),
            )

            docsModel.tryCreate.mockImplementationOnce(() =>
                errAsync(databaseError),
            )

            const result = await docsService.tryCreateDoc().match(
                doc => doc,
                error => error,
            )

            expect(result).toStrictEqual(databaseError)
        })
    })

    describe('tryGetDocById', () => {
        it('should return a doc by id', async () => {
            expect.assertions(1)

            const docId = new mongoose.Types.ObjectId()

            const result = await docsService
                .tryGetDocById(docId)
                .unwrapOr(null)

            expect(result).toStrictEqual({
                _id: docId,
                name: 'test',
                content: 'test',
                type: DocType.JSON,
            })
        })

        it('should return DatabaseError if the doc retrieval fails', async () => {
            expect.assertions(1)

            const databaseError = new DatabaseError(
                'Failed to find Doc',
                new mongoose.Error('something went wrong'),
            )

            docsModel.tryFindById.mockImplementationOnce(() =>
                errAsync(databaseError),
            )

            const result = await docsService
                .tryGetDocById(new mongoose.Types.ObjectId())
                .match(
                    doc => doc,
                    error => error,
                )

            expect(result).toStrictEqual(databaseError)
        })
    })

    describe('tryUpdateDoc', () => {
        it('should update a doc by id', async () => {
            expect.assertions(1)

            const targetDoc = {
                _id: new mongoose.Types.ObjectId(),
                name: 'test',
                content: 'test',
                type: DocType.JSON,
            }

            const updatePayload = {
                name: 'updated',
            }

            const result = await docsService
                .tryUpdateDoc(targetDoc._id, updatePayload)
                .unwrapOr(null)

            expect(result).toStrictEqual({
                ...targetDoc,
                ...updatePayload,
            })
        })

        it('should return DatabaseError if the doc update fails', async () => {
            expect.assertions(1)

            const databaseError = new DatabaseError(
                'Failed to update Doc',
                new mongoose.Error('something went wrong'),
            )

            docsModel.tryFindByIdAndUpdate.mockImplementationOnce(
                () => errAsync(databaseError),
            )

            const result = await docsService
                .tryUpdateDoc(new mongoose.Types.ObjectId(), {})
                .match(
                    doc => doc,
                    error => error,
                )

            expect(result).toStrictEqual(databaseError)
        })
    })
})
