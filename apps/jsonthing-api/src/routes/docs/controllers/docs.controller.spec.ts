import { DocsService } from '@/routes/docs/service'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose from 'mongoose'
import { DocsController } from './docs.controller'

jest.mock('../service')

const ObjectId = mongoose.Types.ObjectId

const testingModuleMetadata = {
    controllers: [DocsController],
    providers: [
        {
            provide: DocsService,
            useClass: DocsService,
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
        it('should use docsService.createDoc', async () => {
            expect.assertions(1)

            const createDocPayload = {
                title: 'Title',
                content: {
                    value: 'doc-content',
                },
            }

            await docsController.createDoc(createDocPayload)

            expect(docsService.createDoc).toHaveBeenCalledWith(
                createDocPayload,
            )
        })

        it('should return docsService.createDoc result', async () => {
            expect.assertions(1)

            const createDocPayload = {
                title: 'Title',
                content: {
                    value: 'doc-content',
                },
            }

            const createDocResult = {
                id: new ObjectId().toString(),

                ...createDocPayload,
            }

            docsService.createDoc.mockResolvedValueOnce(
                createDocResult,
            )

            const result =
                await docsController.createDoc(createDocPayload)

            expect(result).toStrictEqual(createDocResult)
        })
    })

    describe('getDoc', () => {
        it('should use docsService.getDocById', async () => {
            expect.assertions(2)

            const docId = new ObjectId()

            const getDocByIdResult = {
                id: docId.toString(),
                title: 'Title',
                content: {
                    value: 'doc-content',
                },
            }

            docsService.getDocById.mockResolvedValueOnce(
                getDocByIdResult,
            )

            const result = await docsController.getDoc(
                docId.toString(),
            )

            expect(docsService.getDocById).toHaveBeenCalledWith(docId)

            expect(result).toStrictEqual(getDocByIdResult)
        })
    })

    describe('updateDoc', () => {
        it('should use docService.updateDoc', async () => {
            expect.assertions(1)

            const docId = new ObjectId()

            const updatePayload = {
                title: 'New Title',
            }

            await docsController.updateDoc(
                docId.toString(),
                updatePayload,
            )

            expect(docsService.updateDoc).toHaveBeenCalledWith(
                docId,
                updatePayload,
            )
        })

        it('should return docsService.updateDoc result', async () => {
            expect.assertions(1)

            const updatePayload = {
                title: 'New Title',
            }

            const docId = new ObjectId()

            const updateDocResult = {
                id: docId.toString(),
                content: {
                    value: 'doc-content',
                },

                ...updatePayload,
            }

            docsService.updateDoc.mockResolvedValueOnce(
                updateDocResult,
            )

            const result = await docsController.updateDoc(
                docId.toString(),
                updatePayload,
            )

            expect(result).toStrictEqual(updateDocResult)
        })
    })

    describe('getDocContent', () => {
        it('should use docsService.getDocById', async () => {
            expect.assertions(1)

            const docId = new ObjectId()

            // @ts-expect-error: just a mock
            docsService.getDocById.mockResolvedValueOnce({})

            await docsController.getDocContent(docId.toString())

            expect(
                docsService.getDocById,
            ).toHaveBeenCalledExactlyOnceWith(docId)
        })
    })

    it(`should return docsService.getDocById's result.content`, async () => {
        expect.assertions(1)

        const docId = new ObjectId()

        const getDocByIdResult = {
            id: docId.toString(),
            title: 'Title',
            content: {
                value: 'doc-content',
            },
        }

        docsService.getDocById.mockResolvedValueOnce(getDocByIdResult)

        const result = await docsController.getDocContent(
            docId.toString(),
        )

        expect(result).toStrictEqual(getDocByIdResult.content)
    })
})
