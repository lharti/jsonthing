import { DatabaseError } from '@/common/errors/database.error'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { ResultAsync } from 'neverthrow'
import { DocType } from '../constants'
import {
    DocDocument,
    DocsModel,
    TryCreate,
    TryFindById,
    TryFindByIdAndUpdate,
} from './doc.types'

@Schema()
export class Doc {
    @Prop({
        required: true,
        minlength: 1,
        type: String,
    })
    name: string

    @Prop({
        required: true,
        type: Object,
    })
    content: object

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

const tryFindById: TryFindById = function (id) {
    type SafeFindByIdParams = Parameters<TryFindById>

    const safeFindById = ResultAsync.fromThrowable<
        SafeFindByIdParams,
        DocDocument | null,
        DatabaseError
    >(this.findById.bind(this))

    return safeFindById(id)
        .map(result => result)
        .mapErr(
            (error: mongoose.Error) =>
                new DatabaseError('Failed to find Doc', error),
        )
}

const tryFindByIdAndUpdate: TryFindByIdAndUpdate = function (
    id,
    updatePayload,

    options = { new: true },
) {
    type SafeFindByIdAndUpdateParams =
        Parameters<TryFindByIdAndUpdate>

    const safeFindByIdAndUpdate = ResultAsync.fromThrowable<
        SafeFindByIdAndUpdateParams,
        DocDocument | null,
        DatabaseError
    >(this.findByIdAndUpdate.bind(this))

    return safeFindByIdAndUpdate(id, updatePayload, options)
        .map(result => result)
        .mapErr(
            (error: mongoose.Error) =>
                new DatabaseError('Failed to find Doc', error),
        )
}

DocSchema.static({
    tryCreate,
    tryFindById,
    tryFindByIdAndUpdate,
})
// Static methods end

export const docsModel = mongoose.model('Doc', DocSchema) as DocsModel
