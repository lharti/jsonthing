import { Module } from '@nestjs/common'
import { DocsAliasesController, DocsController } from './controllers'
import { DocsModelModule } from './model'
import { DocsService } from './service'

@Module({
    imports: [DocsModelModule],
    controllers: [DocsController, DocsAliasesController],
    providers: [DocsService],
})
export class DocsModule {}
