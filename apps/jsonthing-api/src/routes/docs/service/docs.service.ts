import { DatabaseError } from '@/common/errors/database.error'
import { CreateDocDto } from '@/routes/docs/dtos'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { ResultAsync } from 'neverthrow'
import {
    DEFAULT_DOC_CONTENT,
    DEFAULT_DOC_NAME,
    DocType,
} from '../constants'
import { Doc, DocsModel } from '../model'

type SafeDatabaseResult<T> = ResultAsync<T, DatabaseError>

@Injectable()
export class DocsService {
    private readonly logger = new Logger(DocsService.name)

    constructor(
        @InjectModel(Doc.name)
        private Docs: DocsModel,
    ) {}

    public tryCreateDoc(
        createDocPayload?: CreateDocDto,
    ): SafeDatabaseResult<Doc> {
        const docPayload = {
            name: createDocPayload?.name || DEFAULT_DOC_NAME,

            content: createDocPayload?.content || DEFAULT_DOC_CONTENT,

            type: DocType.JSON,
        }

        return this.Docs.tryCreate(docPayload)
            .mapErr(error => {
                this.logger.error(error)

                return error
            })
            .map(doc => doc)
    }

    public tryGetDocById(
        docId: mongoose.Types.ObjectId,
    ): SafeDatabaseResult<Doc | null> {
        return this.Docs.tryFindById(docId)
            .mapErr(error => {
                this.logger.error(error)

                return error
            })
            .map(doc => doc)
    }
}
