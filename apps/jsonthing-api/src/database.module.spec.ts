import { DatabaseModule } from '@/database.module'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

jest.mock('@nestjs/mongoose')

describe('databaseModule', () => {
    let databaseTestingModule: TestingModule

    beforeAll(async () => {
        databaseTestingModule = await Test.createTestingModule({
            imports: [DatabaseModule],
        }).compile()
    })

    afterAll(() => {
        databaseTestingModule.close()
    })

    it('should setup MongooseModule', () => {
        expect.assertions(2)

        // should inject ConfigService
        // @ts-expect-error - its a mock dude, chill
        expect(MongooseModule.injected?.[0]).toStrictEqual(
            ConfigService,
        )

        // should configure database from ConfigService values
        // @ts-expect-error - its a mock dude, chill
        expect(MongooseModule.config).toMatchInlineSnapshot(`
            {
              "dbName": "DB_NAME_VALUE",
              "uri": "DB_URI_VALUE",
            }
        `)
    })

    it('should import DatabaseModule', () => {
        expect.assertions(1)

        const databaseModule =
            databaseTestingModule.get(MongooseModule)

        expect(databaseModule).toBeInstanceOf(MongooseModule)
    })
})
