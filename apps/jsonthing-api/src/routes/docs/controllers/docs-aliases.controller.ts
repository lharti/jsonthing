import { Controller, Get, Param } from '@nestjs/common'
import mongoose from 'mongoose'
import { DocsService } from '../service'

@Controller('dc')
export class DocsAliasesController {
    constructor(private readonly docsService: DocsService) {}

    @Get(':id')
    getDocContent(@Param('id') docId: string): object {
        const queryId = new mongoose.Types.ObjectId(docId)

        return this.docsService
            .getDocById(queryId)
            .then(doc => doc.content)
    }
}
