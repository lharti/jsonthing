import { Module } from '@nestjs/common'
import { DocsController } from './controllers'
import { DocsModelModule } from './model'
import { DocsService } from './service'

@Module({
    imports: [DocsModelModule],
    controllers: [DocsController],
    providers: [DocsService],
})
export class DocsModule {}
