import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import { DocEditor } from '@/components/DocEditor'
import { DocEndpoint } from '@/components/DocEndpoint'
import { useGetDoc } from '@/hooks/useGetDoc'
import { render } from '@testing-library/react'
import { startHolyLoader, stopHolyLoader } from 'holy-loader'
import { useRouter } from 'next/navigation'
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

jest.mock('next/navigation')
const useRouterMock = jest.mocked(useRouter)

jest.mock('holy-loader')

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
                    title: 'DOC_TITLE',
                },
            },
        )

        render(<DocPage id="DOC_ID" />)

        expect(DocEditorMock).toHaveBeenCalledExactlyOnceWith({
            initialContent: docContent,
            initialTitle: 'DOC_TITLE',
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

    describe('create new doc', () => {
        it('should use CreateNewDocButton', () => {
            expect.assertions(1)

            render(<DocPage id="DOC_ID" />)

            expect(CreateNewDocButtonMock).toHaveBeenCalledExactlyOnceWith({
                className: 'ml-auto',
                onPending: expect.any(Function),
                onError: expect.any(Function),
                onSuccess: expect.any(Function),
            })
        })

        it('should navigate to new doc on success', () => {
            expect.assertions(1)

            const router = {
                push: jest.fn(),
            }

            // @ts-expect-error - we don't need to mock all the properties
            useRouterMock.mockReturnValue(router)

            render(<DocPage id="DOC_ID" />)

            const newDoc = {
                id: 'NEW_DOC_ID',
                title: 'Title',
                content: ['Content'],
            }

            CreateNewDocButtonMock.mock.calls[0][0].onSuccess?.(newDoc)

            expect(router.push).toHaveBeenCalledWith('/docs/NEW_DOC_ID')
        })

        it('should start loader on pending', () => {
            expect.assertions(1)

            const startHolyLoaderMock = jest.mocked(startHolyLoader)

            render(<DocPage id="DOC_ID" />)

            CreateNewDocButtonMock.mock.calls[0][0].onPending?.()

            expect(startHolyLoaderMock).toHaveBeenCalledOnce()
        })

        it('should stop loader on error', () => {
            expect.assertions(1)

            const stopHolyLoaderMock = jest.mocked(stopHolyLoader)

            render(<DocPage id="DOC_ID" />)

            CreateNewDocButtonMock.mock.calls[0][0].onError?.()

            expect(stopHolyLoaderMock).toHaveBeenCalledOnce()
        })
    })
})
