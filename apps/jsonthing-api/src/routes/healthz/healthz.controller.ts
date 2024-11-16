import { Controller, Get } from '@nestjs/common'
import {
    HealthCheck,
    HealthCheckService,
    MongooseHealthIndicator,
} from '@nestjs/terminus'

@Controller('healthz')
export class HealthzController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly mongoose: MongooseHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.mongoose.pingCheck('mongoose'),
        ])
    }
}
