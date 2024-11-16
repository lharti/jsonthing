import {
    HealthCheckService,
    MongooseHealthIndicator,
} from '@nestjs/terminus'
import { Test, TestingModule } from '@nestjs/testing'
import { HealthzController } from './healthz.controller'

describe('healthzController', () => {
    let testModule: TestingModule
    let controller: HealthzController

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HealthzController],
            providers: [
                {
                    provide: HealthCheckService,

                    useValue: {
                        check: jest.fn(checksFuncs =>
                            checksFuncs[0](),
                        ),
                    },
                },

                {
                    provide: MongooseHealthIndicator,

                    useValue: {
                        pingCheck: jest.fn(key =>
                            Promise.resolve({
                                [key]: { status: 'up' },
                            }),
                        ),
                    },
                },
            ],
        }).compile()

        controller = module.get<HealthzController>(HealthzController)

        testModule = module
    })

    afterAll(async () => {
        await testModule.close()
    })

    it('should call health check service with mongoose ping check', async () => {
        expect.assertions(1)

        const checkResult = await controller.check()

        expect(checkResult).toMatchInlineSnapshot(`
            {
              "mongoose": {
                "status": "up",
              },
            }
        `)
    })
})
