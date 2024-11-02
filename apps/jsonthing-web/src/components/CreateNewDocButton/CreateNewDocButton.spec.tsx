import { useCreateDoc } from '@/hooks/useCreateDoc'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { CreateNewDocButton } from './CreateNewDocButton'

jest.mock('@/hooks/useCreateDoc')
const useCreateDocMock = jest.mocked(useCreateDoc)

describe('<CreateNewDocButton />', () => {
    it('should render', () => {
        expect.assertions(1)

        useCreateDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                createDoc: jest.fn(),
            },
        )

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

        const createDocMock = jest.fn((_undefined, { onSuccess }) =>
            onSuccess({ data: { id: 'NEW_DOC_ID' } }),
        )

        useCreateDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                createDoc: createDocMock,
            },
        )

        render(<CreateNewDocButton />)

        const button = screen.getByRole('button')

        button.click()

        expect(createDocMock).toHaveBeenCalledOnce()
    })

    it('should call props.onPending on click', () => {
        expect.assertions(1)

        const onPending = jest.fn()

        useCreateDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                createDoc: jest.fn(),
            },
        )

        render(<CreateNewDocButton onPending={onPending} />)

        const button = screen.getByRole('button')

        button.click()

        expect(onPending).toHaveBeenCalledOnce()
    })

    it('should call props.onSuccess on success', () => {
        expect.assertions(1)

        const onSuccess = jest.fn()

        // @ts-expect-error - we don't need to mock all the properties
        useCreateDocMock.mockReturnValue({
            createDoc: jest.fn(
                (
                    _undefined,

                    // @ts-expect-error - just a mock
                    { onSuccess },
                ) => onSuccess({ data: 'NEW_DOC_DATA' }),
            ),
        })

        render(<CreateNewDocButton onSuccess={onSuccess} />)

        const button = screen.getByRole('button')

        button.click()

        expect(onSuccess).toHaveBeenCalledExactlyOnceWith('NEW_DOC_DATA')
    })

    it('should call props.onError on error', () => {
        expect.assertions(1)

        const onError = jest.fn()

        // @ts-expect-error - we don't need to mock all the properties
        useCreateDocMock.mockReturnValue({
            createDoc: jest.fn(
                (
                    _undefined,

                    // @ts-expect-error - just a mock
                    { onError },
                ) => onError(),
            ),
        })

        render(<CreateNewDocButton onError={onError} />)

        const button = screen.getByRole('button')

        button.click()

        expect(onError).toHaveBeenCalledOnce()
    })
})
