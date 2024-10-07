import { DatabaseError } from '@/common/errors/database.error'
import { Doc } from '@/routes/docs/model/doc.schema'
import mongoose, { HydratedDocument, Model } from 'mongoose'
import { ResultAsync } from 'neverthrow'

export type DocDocument = HydratedDocument<Doc>

export type TryCreate = (doc: Doc) => ResultAsync<Doc, DatabaseError>

export type TryFindById = (
    docId: mongoose.Types.ObjectId,
) => ResultAsync<DocDocument | null, DatabaseError>

export interface DocsModel extends Model<Doc> {
    tryCreate: TryCreate
    tryFindById: TryFindById
}
