import { DocsModelModule } from '@/routes/docs/model/docs.model.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { DocSchema } from './doc.schema'

jest.mock('@nestjs/mongoose')

describe('docsModelModule', () => {
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

    it('should import MongooseModule', async () => {
        expect.assertions(1)

        const docsModelTestingModule = await Test.createTestingModule(
            {
                imports: [DocsModelModule],
            },
        ).compile()

        const mongooseModule =
            docsModelTestingModule.get(MongooseModule)

        expect(mongooseModule).toBeInstanceOf(MongooseModule)

        docsModelTestingModule.close()
    })
})
