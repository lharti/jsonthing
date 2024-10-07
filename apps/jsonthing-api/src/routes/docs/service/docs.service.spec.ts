import { DatabaseError } from '@/common/errors/database.error'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose from 'mongoose'
import { errAsync, okAsync } from 'neverthrow'
import { Doc } from '../model'
import { DocsService } from './docs.service'

const docsModelMock = {
    tryCreate: jest.fn(),
}

const setupServiceTest = async () => {
    const moduleMetadata = {
        providers: [
            DocsService,
            {
                provide: getModelToken(Doc.name),
                useValue: docsModelMock,
            },
        ],
    }

    const testingModule: TestingModule =
        await Test.createTestingModule(moduleMetadata).compile()

    const docsService = testingModule.get<DocsService>(DocsService)

    return { docsService } as const
}

const createdDoc = {
    name: 'doc-name',
    content: 'doc-content',
    _id: 'id',
    type: 'json',
}

describe('docsService', () => {
    describe('tryCreateDoc', () => {
        const createDocPayloadCase = [
            {
                tryCreateDocPayload: {
                    name: 'CUSTOM_NAME',
                    content: '{CUSTOM_CONTENT}',
                },

                expectedTryCreatePayload: {
                    name: 'CUSTOM_NAME',
                    content: '{CUSTOM_CONTENT}',
                    type: 'json',
                },
            },

            {
                tryCreateDocPayload: undefined,

                expectedTryCreatePayload: {
                    name: 'Untitled',
                    content: '{}',
                    type: 'json',
                },
            },
        ]

        it.each(createDocPayloadCase)(
            'should create a new json doc',
            async ({
                tryCreateDocPayload,
                expectedTryCreatePayload,
            }) => {
                expect.assertions(1)

                const { docsService } = await setupServiceTest()

                docsModelMock.tryCreate.mockImplementation(() =>
                    okAsync(createdDoc),
                )

                docsService
                    .tryCreateDoc(tryCreateDocPayload)
                    .unwrapOr(null)

                expect(
                    docsModelMock.tryCreate,
                ).toHaveBeenCalledExactlyOnceWith(
                    expectedTryCreatePayload,
                )
            },
        )

        it('should return the created doc', async () => {
            expect.assertions(1)

            const { docsService } = await setupServiceTest()

            docsModelMock.tryCreate.mockImplementation(() =>
                okAsync(createdDoc),
            )

            const createDocPayload = {
                name: 'doc-name',
                content: 'doc-content',
            }
            const result = docsService
                .tryCreateDoc(createDocPayload)
                .unwrapOr(null)

            await expect(result).resolves.toStrictEqual(createdDoc)
        })

        it('should return DatabaseError if the doc creation fails', async () => {
            expect.assertions(1)

            const { docsService } = await setupServiceTest()

            const databaseError = new DatabaseError(
                'Failed to create Doc',
                new mongoose.Error('something went wrong'),
            )
            docsModelMock.tryCreate.mockImplementation(() =>
                errAsync(databaseError),
            )

            const createDocPayload = {
                name: 'doc-name',
                content: 'doc-content',
            }

            const result = await docsService
                .tryCreateDoc(createDocPayload)
                .match(
                    doc => doc,
                    error => error,
                )

            expect(result).toStrictEqual(databaseError)
        })
    })
})
