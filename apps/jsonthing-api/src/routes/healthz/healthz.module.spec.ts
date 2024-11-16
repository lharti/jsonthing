import { TerminusModule } from '@nestjs/terminus'
import { Test, TestingModule } from '@nestjs/testing'
import { HealthzController } from './healthz.controller'
import { HealthzModule } from './healthz.module'

describe('healthzModule', () => {
    let module: TestingModule

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [HealthzModule],
        }).compile()
    })

    afterAll(async () => {
        await module.close()
    })

    it('should import TerminusModule', () => {
        expect.assertions(1)

        const terminusModule = module.get(TerminusModule)

        expect(terminusModule).toBeDefined()
    })

    it('should have HealthzController', () => {
        expect.assertions(1)

        const healthzController = module.get(HealthzController)

        expect(healthzController).toBeDefined()
    })
})
