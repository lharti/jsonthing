import { DocsModelModule } from '@/routes/docs/model/docs.model.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { DocSchema } from './doc.schema'

jest.mock('@nestjs/mongoose')

describe('docsModelModule', () => {
    let docsModelTestingModule: TestingModule

    beforeAll(async () => {
        docsModelTestingModule = await Test.createTestingModule({
            imports: [DocsModelModule],
        }).compile()
    })

    afterAll(async () => {
        await docsModelTestingModule.close()
    })

    it('should setup DocsModel', () => {
        expect.assertions(1)

        // @ts-expect-error - i know, it's just a mock
        expect(MongooseModule.models).toStrictEqual([
            {
                name: 'Doc',
                schema: DocSchema,
            },
        ])
    })

    it('should imports MongooseModule.forFeature response module', () => {
        expect.assertions(1)

        const mongooseModule =
            docsModelTestingModule.get(MongooseModule)

        expect(mongooseModule).toBeDefined()
    })

    it('should export MongooseModule', () => {
        expect.assertions(1)

        const docsModelModuleExports = Reflect.getMetadata(
            'exports',
            DocsModelModule,
        )

        expect(docsModelModuleExports).toStrictEqual([MongooseModule])
    })
})
