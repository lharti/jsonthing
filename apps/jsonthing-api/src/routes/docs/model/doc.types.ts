import { Doc } from '@/routes/docs/model/doc.schema'
import { HydratedDocument, Model } from 'mongoose'

export type DocDocument = HydratedDocument<Doc>

export type DocsModel = Model<Doc>
