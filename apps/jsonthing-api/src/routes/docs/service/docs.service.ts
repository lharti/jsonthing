import { CreateDocDto } from '@/routes/docs/dtos'
import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { DEFAULT_DOC_CONTENT, DEFAULT_DOC_NAME } from '../constants'
import { Doc, DocsModel } from '../model'

@Injectable()
export class DocsService {
    private readonly logger = new Logger(DocsService.name)

    constructor(
        @InjectModel(Doc.name)
        private Docs: DocsModel,
    ) {}

    public createDoc(createDocPayload?: CreateDocDto): Promise<Doc> {
        const docPayload = {
            title: createDocPayload?.title || DEFAULT_DOC_NAME,

            content: createDocPayload?.content || DEFAULT_DOC_CONTENT,
        }

        const result = this.Docs.create(docPayload)

            .catch(error => {
                this.logger.error(error)

                throw new InternalServerErrorException(
                    `Failed to create doc`,
                )
            })

            .then(doc => doc.toObject())

        return result
    }

    public getDocById(docId: mongoose.Types.ObjectId): Promise<Doc> {
        const result = this.Docs.findById(docId)

            .catch(error => {
                this.logger.error(error)

                throw new InternalServerErrorException(
                    `Failed to get doc`,
                )
            })

            .then(doc => {
                if (!doc) {
                    throw new NotFoundException('Doc not found')
                }

                return doc.toObject()
            })

        return result
    }

    public updateDoc(
        docId: mongoose.Types.ObjectId,
        updateDocPayload: Partial<Doc>,
    ): Promise<Doc> {
        const result = this.Docs.findByIdAndUpdate(
            docId,
            updateDocPayload,
        )
            .catch(error => {
                this.logger.error(error)

                throw new InternalServerErrorException(
                    `Failed to update doc`,
                )
            })

            .then(doc => {
                if (!doc) {
                    throw new NotFoundException('Doc not found')
                }

                return doc.toObject()
            })

        return result
    }
}
