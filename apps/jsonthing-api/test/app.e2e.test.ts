import { describe, expect, it } from '@jest/globals'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

const mockApp = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile()

    const app = moduleFixture.createNestApplication()

    await app.init()

    return app
}

describe('appController (e2e)', () => {
    it('/ (GET)', async () => {
        expect.assertions(2)

        const app = await mockApp()

        const response = await request(app.getHttpServer()).get('/')

        expect(response.text).toBe('Hello World!')
        expect(response.status).toBe(200)
    })
})
