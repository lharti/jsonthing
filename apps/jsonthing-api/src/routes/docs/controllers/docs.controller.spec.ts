import {
    createDocPayloadFixture,
    docFixture,
} from '@/common/helpers/fixtures'
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

            await docsController.createDoc(createDocPayloadFixture)

            expect(docsService.createDoc).toHaveBeenCalledWith(
                createDocPayloadFixture,
            )
        })

        it('should return docsService.createDoc result', async () => {
            expect.assertions(1)

            const createDocResult = docFixture

            docsService.createDoc.mockResolvedValueOnce(
                createDocResult,
            )

            const result = await docsController.createDoc(
                createDocPayloadFixture,
            )

            expect(result).toStrictEqual(createDocResult)
        })
    })

    describe('getDoc', () => {
        it('should use docsService.getDocById', async () => {
            expect.assertions(1)

            const docId = new ObjectId()

            await docsController.getDoc(docId.toString())

            expect(docsService.getDocById).toHaveBeenCalledWith(docId)
        })

        it('should return docsService.getDocById result', async () => {
            expect.assertions(1)

            const docId = new ObjectId()

            const getDocByIdResult = docFixture

            docsService.getDocById.mockResolvedValueOnce(
                getDocByIdResult,
            )

            const result = await docsController.getDoc(
                docId.toString(),
            )

            expect(result).toStrictEqual(docFixture)
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

            const updateDocResult = docFixture

            docsService.updateDoc.mockResolvedValueOnce(
                updateDocResult,
            )

            const docId = new ObjectId()

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

        const getDocByIdResult = docFixture

        docsService.getDocById.mockResolvedValueOnce(getDocByIdResult)

        const result = await docsController.getDocContent(
            docId.toString(),
        )

        expect(result).toStrictEqual(getDocByIdResult.content)
    })
})
