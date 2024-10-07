import { Module } from '@nestjs/common'
import { DocsController } from './controller'
import { DocsModelModule } from './model'
import { DocsService } from './service'

@Module({
    imports: [DocsModelModule],
    controllers: [DocsController],
    providers: [DocsService],
})
export class DocsModule {}
