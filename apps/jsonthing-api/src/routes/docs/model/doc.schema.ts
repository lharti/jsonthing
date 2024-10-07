import { DatabaseError } from '@/common/errors/database.error'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { ResultAsync } from 'neverthrow'
import { DocType } from '../constants'
import { DocsModel, TryCreate } from './doc.types'

@Schema()
export class Doc {
    _id?: mongoose.Types.ObjectId

    @Prop({
        required: true,
        minlength: 1,
        type: String,
    })
    name: string

    @Prop({
        required: true,
    })
    content: string

    @Prop({
        required: true,
        enum: DocType,
    })
    type: DocType
}

export const DocSchema = SchemaFactory.createForClass(Doc)

// Static methods start
const tryCreate: TryCreate = function (docPayload: Doc) {
    type SafeCreateParams = [docPayload: Doc]

    const safeCreate = ResultAsync.fromThrowable<
        SafeCreateParams,
        Doc,
        DatabaseError
    >(() => this.create(docPayload))

    return safeCreate(docPayload).mapErr(
        (error: mongoose.Error) =>
            new DatabaseError('Failed to create Doc', error),
    )
}

DocSchema.static({
    tryCreate,
})
// Static methods end

export const docsModel = mongoose.model('Doc', DocSchema) as DocsModel
