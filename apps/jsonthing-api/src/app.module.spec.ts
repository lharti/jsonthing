import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/database.module'
import { DocsModule } from '@/routes/docs'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

jest.mock('@nestjs/config')
jest.mock('@/database.module')
jest.mock('@/routes/docs')

describe('appModule', () => {
    let appModule: TestingModule

    beforeAll(async () => {
        appModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()
    })

    afterAll(() => {
        appModule.close()
    })

    it('should setup ConfigModule', async () => {
        expect.assertions(1)

        let configForRootMethod: jest.SpyInstance

        await jest.isolateModulesAsync(async () => {
            configForRootMethod = jest.spyOn(ConfigModule, 'forRoot')

            const { appConfigValidationSchema } = await import(
                '@/config/app.config'
            )

            await import('./app.module')

            expect(
                configForRootMethod,
            ).toHaveBeenCalledExactlyOnceWith({
                isGlobal: true,
                cache: true,
                validationSchema: appConfigValidationSchema,
            })
        })
    })

    it('should import ConfigModule', () => {
        expect.assertions(1)

        const configModule = appModule.get(ConfigModule)

        expect(configModule).toBeInstanceOf(ConfigModule)
    })

    it('should import DatabaseModule', () => {
        expect.assertions(1)

        const databaseModule = appModule.get(DatabaseModule)

        expect(databaseModule).toBeInstanceOf(DatabaseModule)
    })

    it('should import DocsModule', () => {
        expect.assertions(1)

        const docsModule = appModule.get<DocsModule>(DocsModule)

        expect(docsModule).toBeInstanceOf(DocsModule)
    })
})
