import { DocEditor } from '@/components/DocEditor'
import { useGetDoc } from '@/hooks/useGetDoc'
import { render } from '@testing-library/react'
import React from 'react'
import { DocPage } from './index'

jest.mock('@/hooks/useGetDoc')
const useGetDocMock = jest.mocked(useGetDoc)

jest.mock('@/components/DocEditor')
const DocEditorMock = jest.mocked(DocEditor)

describe('<DocPage />', () => {
    it('should render', () => {
        expect.assertions(1)

        useGetDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                data: 'DOC_CONTENT',
            },
        )

        DocEditorMock.mockReturnValue('DOC_EDITOR')

        const { container } = render(<DocPage id="DOC_ID" />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              DOC_EDITOR
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

        render(<DocPage id={docId} />)

        expect(useGetDocMock).toHaveBeenCalledExactlyOnceWith(docId)
    })

    it('should pass doc data to DocEditor', () => {
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

        render(<DocPage id="DOC_ID" />)

        expect(DocEditorMock).toHaveBeenCalledExactlyOnceWith({
            initialContent: docContent,
            initialTitle: 'DOC_NAME',
            docId: 'DOC_ID',
        })
    })
})
