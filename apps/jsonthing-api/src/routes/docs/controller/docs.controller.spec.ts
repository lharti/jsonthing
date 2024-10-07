import { DatabaseError } from '@/common/errors/database.error'
import { DocsService } from '@/routes/docs/service'
import { InternalServerErrorException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose from 'mongoose'
import { errAsync, okAsync } from 'neverthrow'
import { DocType } from '../constants'
import { DocsController } from './docs.controller'

const createdDoc = {
    name: 'doc-name',
    content: 'doc-content',
    _id: new mongoose.Types.ObjectId(),
    type: DocType.JSON,
}

describe('docsController', () => {
    let testingModule: TestingModule
    let docsService: jest.Mocked<DocsService>
    let docsController: DocsController

    beforeAll(async () => {
        testingModule = await Test.createTestingModule({
            controllers: [DocsController],
            providers: [
                {
                    provide: DocsService,
                    useValue: {
                        tryCreateDoc: jest.fn(),
                    },
                },
            ],
        }).compile()

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

            docsService.tryCreateDoc.mockImplementation(() =>
                okAsync(createdDoc),
            )

            await docsController.createDoc(createDocPayload)

            expect(
                docsService.tryCreateDoc,
            ).toHaveBeenCalledExactlyOnceWith(createDocPayload)
        })

        it('should return the created doc', async () => {
            expect.assertions(1)

            docsService.tryCreateDoc.mockImplementation(() =>
                okAsync(createdDoc),
            )

            const result = await docsController.createDoc()

            expect(result).toBe(createdDoc)
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
