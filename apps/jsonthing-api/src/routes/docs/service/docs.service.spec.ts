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
})
