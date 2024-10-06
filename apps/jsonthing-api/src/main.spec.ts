import { AppModule } from '@/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { bootstrap } from './main'

const mockNestFactoryCreate = () => {
    const appConfigGetMethod = jest.fn()

    const app = {
        useGlobalPipes: jest.fn(),

        listen: jest.fn(),

        get: jest.fn().mockReturnValue({
            get: appConfigGetMethod,
        }),

        getUrl: jest.fn(),
    }

    const nestFactoryCreateMethod = jest
        .spyOn(NestFactory, 'create')
        .mockResolvedValue(app as unknown as INestApplication)

    return {
        nestFactoryCreateMethod,
        app,
        appConfigGetMethod,
    } as const
}

describe('bootstrap', () => {
    it('should create app instance', async () => {
        expect.assertions(1)

        const { nestFactoryCreateMethod } = mockNestFactoryCreate()

        await bootstrap()

        expect(
            nestFactoryCreateMethod,
        ).toHaveBeenCalledExactlyOnceWith(AppModule)
    })

    it('should use global validation pipe', async () => {
        expect.assertions(1)

        const { app } = mockNestFactoryCreate()

        await bootstrap()

        expect(app.useGlobalPipes).toHaveBeenCalledExactlyOnceWith(
            expect.any(ValidationPipe),
        )
    })

    it('should start app with the right port', async () => {
        expect.assertions(3)

        const FALLBACK_PORT = 3000
        const APP_CONFIG_PORT = 5000

        const { app, appConfigGetMethod } = mockNestFactoryCreate()

        appConfigGetMethod.mockReturnValueOnce(APP_CONFIG_PORT)

        await bootstrap()

        expect(app.get).toHaveBeenCalledExactlyOnceWith(ConfigService)

        expect(appConfigGetMethod).toHaveBeenCalledExactlyOnceWith(
            'PORT',
            FALLBACK_PORT,
        )

        expect(app.listen).toHaveBeenCalledExactlyOnceWith(
            APP_CONFIG_PORT,
        )
    })
})
