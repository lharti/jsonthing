import { DocsAliasesController } from '@/routes/docs/controllers/docs-aliases.controller'
import { DocsService } from '@/routes/docs/service'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

jest.mock('../service')

const testingModuleMetadata = {
    controllers: [DocsAliasesController],
    providers: [
        {
            provide: DocsService,
            useClass: DocsService,
        },
    ],
}

describe('docsAliasesController', () => {
    let testingModule: TestingModule
    let docsService: jest.Mocked<DocsService>
    let docsAliasesController: DocsAliasesController

    beforeAll(async () => {
        testingModule = await Test.createTestingModule(
            testingModuleMetadata,
        ).compile()

        docsService = testingModule.get(DocsService)

        docsAliasesController = testingModule.get(
            DocsAliasesController,
        )
    })

    afterAll(() => {
        testingModule.close()
    })

    describe('getDocContent', () => {
        it('should use docsService.getDocById', async () => {
            expect.assertions(1)

            const docId = new ObjectId()

            // @ts-expect-error: just a mock
            docsService.getDocById.mockResolvedValueOnce({})

            await docsAliasesController.getDocContent(
                docId.toString(),
            )

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

        const result = await docsAliasesController.getDocContent(
            docId.toString(),
        )

        expect(result).toStrictEqual(getDocByIdResult.content)
    })
})
