/* eslint-disable n/handle-callback-err */
import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common'
import mongoose from 'mongoose'
import { CreateDocDto } from '../dtos'
import { DocsService } from '../service'

@Controller('docs')
export class DocsController {
    constructor(private readonly docsService: DocsService) {}

    @Post()
    createDoc(@Body() createDocPayload?: CreateDocDto) {
        const result = this.docsService.tryCreateDoc(createDocPayload)

        return result.match(
            doc => doc,

            err => {
                throw new InternalServerErrorException(
                    `Failed to create doc: ${err.name}`,
                )
            },
        )
    }

    @Get(':id')
    getDoc(@Param('id') docId: string) {
        const queryId = new mongoose.Types.ObjectId(docId)

        const result = this.docsService.tryGetDocById(queryId)

        return result.match(
            doc => {
                if (!doc) {
                    throw new NotFoundException('Doc not found')
                } else return doc
            },

            err => {
                throw new InternalServerErrorException(
                    `Failed to get doc: ${err.name}`,
                )
            },
        )
    }
}
