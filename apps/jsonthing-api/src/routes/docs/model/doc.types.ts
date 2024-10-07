import { DatabaseError } from '@/common/errors/database.error'
import { Doc } from '@/routes/docs/model/doc.schema'
import { Model } from 'mongoose'
import { ResultAsync } from 'neverthrow'

export type TryCreate = (doc: Doc) => ResultAsync<Doc, DatabaseError>

export interface DocsModel extends Model<Doc> {
    tryCreate: TryCreate
}
