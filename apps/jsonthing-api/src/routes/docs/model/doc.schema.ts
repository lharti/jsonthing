import { Json } from '@/common/types'
import {
    Prop,
    Schema,
    SchemaFactory,
    Virtual,
} from '@nestjs/mongoose'
import mongoose, { ToObjectOptions } from 'mongoose'
import { DocsModel } from './doc.types'

const toObject: ToObjectOptions = {
    transform: function (_doc, ret) {
        delete ret._id
        delete ret.__v
    },

    virtuals: true,
}

@Schema({
    toObject,
    toJSON: toObject,
    id: true,
})
export class Doc {
    @Prop({
        required: true,
        minlength: 1,
        type: String,
    })
    title: string

    @Prop({
        required: true,
        type: mongoose.Schema.Types.Mixed,
    })
    content: Json

    @Virtual({
        get: function () {
            return JSON.stringify(this.content, null, 2)
        },
    })
    contentText: string

    id: string
}

export const DocSchema = SchemaFactory.createForClass(Doc)

export const docsModel = mongoose.model('Doc', DocSchema) as DocsModel
