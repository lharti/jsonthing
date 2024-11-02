import { Doc } from '@/types/doc.types'
import { CreateDocMock, UseCreateDocMock } from '@/types/mocks.types'

const getCreateDocMock = () => {
    let isCreateDocSetToFail = false

    let newDoc: Doc = {
        id: 'NEW_DOC_ID',
        content: 'NEW_DOC_CONTENT',
        title: 'NEW_DOC_TITLE',
    }

    const createDocMock = jest.fn((_payload, { onSuccess, onError }) => {
        if (isCreateDocSetToFail) {
            onError()
            return
        }

        onSuccess({
            data: newDoc,
        })
    }) as CreateDocMock

    createDocMock.toFail = () => {
        isCreateDocSetToFail = true
    }

    createDocMock.toCreateDocWith = docData => {
        isCreateDocSetToFail = false

        newDoc = {
            ...newDoc,
            ...docData,
        }
    }

    return createDocMock
}

const createDocMock = getCreateDocMock()

const useCreateDoc = jest.fn(() => ({
    createDoc: createDocMock,
})) as UseCreateDocMock

useCreateDoc.createDocMock = createDocMock

export { useCreateDoc }
