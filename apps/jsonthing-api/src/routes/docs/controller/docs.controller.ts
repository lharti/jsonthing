/* eslint-disable n/handle-callback-err */
import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common'
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
}
