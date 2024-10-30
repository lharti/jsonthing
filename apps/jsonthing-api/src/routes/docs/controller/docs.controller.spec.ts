import { DatabaseError } from '@/common/errors/database.error'
import { DocsService } from '@/routes/docs/service'
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
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

                tryGetDocById: jest.fn(docId =>
                    okAsync({
                        _id: docId.toString(),
                        name: 'test',
                        content: 'test',
                        type: 'JSON',
                    }),
                ),

                tryUpdateDoc: jest.fn((id, update) =>
                    okAsync({
                        _id: id.toString(),
                        name: 'test',
                        content: 'test',
                        type: 'JSON',
                        ...update,
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
                content: {
                    value: 'doc-content',
                },
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
                content: {
                    value: `doc-content-${Math.random()}`,
                },
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

    describe('getDoc', () => {
        it('should get a doc by id', async () => {
            expect.assertions(1)

            const targetDocId =
                new mongoose.Types.ObjectId().toString()

            const result = await docsController.getDoc(targetDocId)

            expect(result).toStrictEqual({
                _id: targetDocId,
                name: 'test',
                content: 'test',
                type: 'JSON',
            })
        })

        it('should throw NotFoundException if doc not found', async () => {
            expect.assertions(1)

            const targetDocId =
                new mongoose.Types.ObjectId().toString()

            docsService.tryGetDocById.mockImplementation(() =>
                okAsync(null),
            )

            const notFoundException = new NotFoundException(
                'Doc not found',
            )

            await expect(
                docsController.getDoc(targetDocId),
            ).rejects.toThrow(notFoundException)
        })

        it('should throw InternalServiceErrorException if doc retrieval failed', async () => {
            expect.assertions(1)

            const targetDocId =
                new mongoose.Types.ObjectId().toString()

            docsService.tryGetDocById.mockImplementation(() =>
                errAsync(new Error('something went wrong')),
            )

            const internalException =
                new InternalServerErrorException(
                    'Failed to get doc: Error',
                )

            await expect(
                docsController.getDoc(targetDocId),
            ).rejects.toThrow(internalException)
        })
    })

    describe('updateDoc', () => {
        it('should update a doc by id', async () => {
            expect.assertions(1)

            const targetDocId =
                new mongoose.Types.ObjectId().toString()

            const updatePayload = {
                name: 'updated',
            }

            const result = await docsController.updateDoc(
                targetDocId,
                updatePayload,
            )

            expect(result).toStrictEqual({
                _id: targetDocId,
                content: 'test',
                type: 'JSON',
                ...updatePayload,
            })
        })

        it('should throw NotFoundException if doc not found', async () => {
            expect.assertions(1)

            const targetDocId =
                new mongoose.Types.ObjectId().toString()

            docsService.tryUpdateDoc.mockImplementation(() =>
                okAsync(null),
            )

            const notFoundException = new NotFoundException(
                'Doc not found',
            )

            await expect(
                docsController.updateDoc(targetDocId, {}),
            ).rejects.toThrow(notFoundException)
        })

        it('should throw InternalServiceErrorException if doc update failed', async () => {
            expect.assertions(1)

            const targetDocId =
                new mongoose.Types.ObjectId().toString()

            docsService.tryUpdateDoc.mockImplementation(() =>
                errAsync(new Error('something went wrong')),
            )

            const internalException =
                new InternalServerErrorException(
                    'Failed to update doc: Error',
                )

            await expect(
                docsController.updateDoc(targetDocId, {}),
            ).rejects.toThrow(internalException)
        })
    })
})
