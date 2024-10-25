import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import { DocEditor } from '@/components/DocEditor'
import { DocEndpoint } from '@/components/DocEndpoint'
import { useGetDoc } from '@/hooks/useGetDoc'
import { render } from '@testing-library/react'
import React from 'react'
import { DocPage } from './index'

jest.mock('@/hooks/useGetDoc')
const useGetDocMock = jest.mocked(useGetDoc)

jest.mock('@/components/DocEditor')
const DocEditorMock = jest.mocked(DocEditor)

jest.mock('@/components/CreateNewDocButton')
const CreateNewDocButtonMock = jest.mocked(CreateNewDocButton)

jest.mock('@/components/DocEndpoint')
const DocEndpointMock = jest.mocked(DocEndpoint)

describe('<DocPage />', () => {
    it('should render', () => {
        expect.assertions(1)

        useGetDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                data: 'DOC_CONTENT',
            },
        )

        DocEditorMock.mockReturnValue('{DOC_EDITOR}')
        CreateNewDocButtonMock.mockReturnValue('{CREATE_NEW_DOC_BUTTON}')
        DocEndpointMock.mockReturnValue('{DOC_ENDPOINT}')

        const { container } = render(<DocPage id="DOC_ID" />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <article
                class="
                          mx-auto max-w-screen-md px-4

                          md:px-2
                        "
              >
                <header
                  class="mb-12 mt-3 flex flex-wrap-reverse"
                >
                  {DOC_ENDPOINT}
                  {CREATE_NEW_DOC_BUTTON}
                </header>
                <main>
                  {DOC_EDITOR}
                </main>
              </article>
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

    it('should setup DocEndpoint', () => {
        expect.assertions(1)

        render(<DocPage id="DOC_ID" />)

        expect(DocEndpointMock).toHaveBeenCalledExactlyOnceWith({
            docId: 'DOC_ID',

            className: `
                      mt-4 w-full

                      sm:mt-0 sm:w-auto
                    `,
        })
    })
})
