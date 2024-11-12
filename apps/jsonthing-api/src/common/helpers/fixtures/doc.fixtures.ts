import { Doc } from '@/routes/docs/model'
import mongoose from 'mongoose'

export const createDocPayloadFixture = {
    title: 'Sample Doc Title',

    content: {
        key: 'value',
    },
}

export const docFixture: Doc = {
    id: new mongoose.Types.ObjectId().toString(),

    ...createDocPayloadFixture,

    contentText: JSON.stringify(
        createDocPayloadFixture.content,
        null,
        2,
    ),
}
