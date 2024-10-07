import { DatabaseError } from '@/common/errors/database.error'
import { DocsService } from '@/routes/docs/service'
import { InternalServerErrorException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose from 'mongoose'
import { errAsync, okAsync } from 'neverthrow'
import { DocsController } from './docs.controller'

const testingModuleMetadata = {
    controllers: [DocsController],
    providers: [
        {
            provide: DocsService,
            useValue: {
                tryCreateDoc: jest.fn(payload =>
                    okAsync({
                        ...payload,
                        _id: new mongoose.Types.ObjectId(),
                    }),
                ),
            },
        },
    ],
}

describe('docsController', () => {
    let testingModule: TestingModule
    let docsService: jest.Mocked<DocsService>
    let docsController: DocsController

    beforeAll(async () => {
        testingModule = await Test.createTestingModule(
            testingModuleMetadata,
        ).compile()

        docsService = testingModule.get(DocsService)

        docsController = testingModule.get(DocsController)
    })

    afterAll(() => {
        testingModule.close()
    })

    describe('createDoc', () => {
        it('should create a new doc', async () => {
            expect.assertions(1)

            const createDocPayload = {
                name: 'doc-name',
                content: 'doc-content',
            }

            await docsController.createDoc(createDocPayload)

            expect(
                docsService.tryCreateDoc,
            ).toHaveBeenCalledExactlyOnceWith(createDocPayload)
        })

        it('should return the created doc', async () => {
            expect.assertions(1)

            const createDocPayload = {
                name: `doc-${Math.random()}`,
                content: `doc-content-${Math.random()}`,
            }
            const result =
                await docsController.createDoc(createDocPayload)

            expect(result).toStrictEqual({
                _id: expect.any(mongoose.Types.ObjectId),
                ...createDocPayload,
            })
        })

        it('should throw InternalServiceErrorException if doc creation failed', async () => {
            expect.assertions(1)

            const tryCreateError = new DatabaseError(
                'something went wrong',
                new Error('DatabaseError'),
            )

            docsService.tryCreateDoc.mockImplementation(() =>
                errAsync(tryCreateError),
            )

            const internalException =
                new InternalServerErrorException(
                    `Failed to create doc: ${tryCreateError.name}`,
                )

            await expect(docsController.createDoc()).rejects.toThrow(
                internalException,
            )
        })
    })
})
