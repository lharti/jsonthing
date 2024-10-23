import { JsonEditor } from '@/components/JsonEditor'
import { useGetDoc } from '@/hooks/useGetDoc'
import { render } from '@testing-library/react'
import React from 'react'
import { DocView } from './index'

jest.mock('@/hooks/useGetDoc')
const useGetDocMock = jest.mocked(useGetDoc)

jest.mock('@/components/JsonEditor')
const JsonEditorMock = jest.mocked(JsonEditor)

describe('<DocView />', () => {
    it('should render', () => {
        expect.assertions(1)

        useGetDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                data: 'DOC_CONTENT',
            },
        )

        JsonEditorMock.mockReturnValue('JSON_EDITOR')

        const { container } = render(<DocView id="DOC_ID" />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                JSON_EDITOR
              </div>
            </div>
        `)
    })

    it('should fetch doc on mount', () => {
        expect.assertions(1)

        useGetDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                data: '',
            },
        )

        const docId = Math.random().toString()

        render(<DocView id={docId} />)

        expect(useGetDocMock).toHaveBeenCalledExactlyOnceWith(docId)
    })

    it('should pass doc data to JsonEditor', () => {
        expect.assertions(1)

        const docContent = Math.random().toString()

        useGetDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                data: {
                    content: docContent,
                    name: 'DOC_NAME',
                },
            },
        )

        render(<DocView id="DOC_ID" />)

        expect(JsonEditorMock).toHaveBeenCalledExactlyOnceWith({
            initialContent: docContent,
            initialTitle: 'DOC_NAME',
            docId: 'DOC_ID',
        })
    })
})
