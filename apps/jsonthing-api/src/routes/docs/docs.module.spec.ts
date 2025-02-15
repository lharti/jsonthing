import { Test, TestingModule } from '@nestjs/testing'
import { DocsModule } from '.'
import { DocsAliasesController, DocsController } from './controllers'
import { DocsModelModule } from './model'
import { DocsService } from './service'

jest.mock('./controllers')
jest.mock('./service')
jest.mock('./model')

describe('docsModule', () => {
    let docsTestingModule: TestingModule

    beforeAll(async () => {
        docsTestingModule = await Test.createTestingModule({
            imports: [DocsModule],
        }).compile()
    })

    afterAll(() => {
        docsTestingModule.close()
    })

    it('should import DocsModuleModule', () => {
        expect.assertions(1)

        const docsModelModule = docsTestingModule.get(DocsModelModule)

        expect(docsModelModule).toBeDefined()
    })

    it('should have DocsController', () => {
        expect.assertions(1)

        const docsController = docsTestingModule.get(DocsController)

        expect(docsController).toBeDefined()
    })

    it('should have DocsAliasesController', () => {
        expect.assertions(1)

        const docsAliasesController = docsTestingModule.get(
            DocsAliasesController,
        )

        expect(docsAliasesController).toBeDefined()
    })

    it('should have DocsService', () => {
        expect.assertions(1)

        const docsService = docsTestingModule.get(DocsService)

        expect(docsService).toBeDefined()
    })
})
