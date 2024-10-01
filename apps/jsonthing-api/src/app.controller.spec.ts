import { describe, expect, it } from '@jest/globals'
import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const getAppController = async () => {
    const app: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
    }).compile()

    return app.get<AppController>(AppController)
}

describe('appController', () => {
    describe('root', () => {
        it('should return "Hello World!"', async () => {
            expect.assertions(1)

            const appController = await getAppController()

            expect(appController.getHello()).toBe('Hello World!')
        })
    })
})
