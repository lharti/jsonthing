import { useCreateDoc } from '@/hooks/useCreateDoc'
import { UseCreateDocMock } from '@/types/mocks.types'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { CreateNewDocButton } from './CreateNewDocButton'

jest.mock('@/hooks/useCreateDoc')
jest.mock('next/navigation')

const setupTestMocks = () => {
    const routerMock = {
        push: jest.fn(),
    }

    // @ts-expect-error - we don't need to mock all the properties
    jest.mocked(useRouter).mockReturnValue(routerMock)

    const useCreateDocMock = jest.mocked(useCreateDoc) as UseCreateDocMock

    return {
        useCreateDocMock,

        createDocMock: useCreateDocMock.createDocMock,
        routerMock,
    }
}

describe('<CreateNewDocButton />', () => {
    it('should render', () => {
        expect.assertions(1)

        setupTestMocks()

        const { container } = render(<CreateNewDocButton />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <button
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors dark:focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 bg-gray-900 text-gray-50 shadow dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 hover:bg-gray-900/90 h-9 px-4 py-2"
              >
                New Doc
              </button>
            </div>
        `)
    })

    it('should create new doc on click', () => {
        expect.assertions(1)

        const { createDocMock } = setupTestMocks()

        render(<CreateNewDocButton />)

        const button = screen.getByRole('button')

        button.click()

        expect(createDocMock).toHaveBeenCalledOnce()
    })

    it('should redirect to new doc on success', () => {
        expect.assertions(1)

        const { routerMock, createDocMock } = setupTestMocks()

        render(<CreateNewDocButton />)

        const button = screen.getByRole('button')

        createDocMock.toCreateDocWith({
            id: 'NEW_DOC_ID',
        })

        button.click()

        expect(routerMock.push).toHaveBeenCalledExactlyOnceWith(
            '/docs/NEW_DOC_ID',
        )
    })

    it('should call props.onPending on click', () => {
        expect.assertions(1)

        setupTestMocks()

        const onPending = jest.fn()

        render(<CreateNewDocButton onPending={onPending} />)

        const button = screen.getByRole('button')

        button.click()

        expect(onPending).toHaveBeenCalledOnce()
    })

    it('should call props.onSuccess on success', () => {
        expect.assertions(1)

        const newDoc = {
            id: 'NEW_DOC_ID',
            content: 'NEW_DOC_CONTENT',
            title: 'NEW_DOC_TITLE',
        }

        const { createDocMock } = setupTestMocks()

        const onSuccess = jest.fn()

        render(<CreateNewDocButton onSuccess={onSuccess} />)

        const button = screen.getByRole('button')

        createDocMock.toCreateDocWith(newDoc)

        button.click()

        expect(onSuccess).toHaveBeenCalledExactlyOnceWith(newDoc)
    })

    it('should call props.onError on error', () => {
        expect.assertions(1)

        const { createDocMock } = setupTestMocks()

        const onError = jest.fn()

        render(<CreateNewDocButton onError={onError} />)

        const button = screen.getByRole('button')

        createDocMock.toFail()

        button.click()

        expect(onError).toHaveBeenCalledOnce()
    })
})
