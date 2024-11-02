import { Doc } from '@/types/doc.types'

export type CreateDocMock = jest.Mock & {
    toFail: () => void
    toCreateDocWith: (doc: Partial<Doc>) => void
}

export type UseCreateDocMock = jest.Mock & {
    createDocMock: CreateDocMock
}
