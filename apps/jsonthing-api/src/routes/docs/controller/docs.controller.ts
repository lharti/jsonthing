import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import mongoose from 'mongoose'
import { CreateDocDto, UpdateDocDto } from '../dtos'
import { DocsService } from '../service'

@Controller('docs')
export class DocsController {
    constructor(private readonly docsService: DocsService) {}

    @Post()
    createDoc(@Body() createDocPayload?: CreateDocDto) {
        return this.docsService.createDoc(createDocPayload)
    }

    @Get(':id')
    getDoc(@Param('id') docId: string) {
        const queryId = new mongoose.Types.ObjectId(docId)

        return this.docsService.getDocById(queryId)
    }

    @Patch(':id')
    updateDoc(
        @Param('id') docId: string,
        @Body() updateDocPayload: UpdateDocDto,
    ) {
        const queryId = new mongoose.Types.ObjectId(docId)

        return this.docsService.updateDoc(queryId, updateDocPayload)
    }

    @Get(':id/content')
    getDocContent(@Param('id') docId: string): object {
        const queryId = new mongoose.Types.ObjectId(docId)

        return this.docsService
            .getDocById(queryId)
            .then(doc => doc.content)
    }
}
