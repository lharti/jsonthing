import { useCreateDoc } from '@/hooks/useCreateDoc'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { CreateNewDocButton } from './CreateNewDocButton'

jest.mock('@/hooks/useCreateDoc')
const useCreateDocMock = jest.mocked(useCreateDoc)

jest.mock('next/navigation')
const useRouterMock = jest.mocked(useRouter)

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
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors dark:focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 bg-gray-900 text-gray-50 shadow dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 hover:bg-gray-900/90 h-9 px-4 py-2 my-3 ml-auto"
              >
                New Doc
              </button>
            </div>
        `)
    })

    it('should create new doc on click', () => {
        expect.assertions(1)

        const newDocId = Math.random()

        // Mock useCreateDoc hook
        const createDocMock = jest.fn((_undefined, { onSuccess }) =>
            onSuccess({ data: { _id: newDocId } }),
        )

        useCreateDocMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                createDoc: createDocMock,
            },
        )

        // Mock router
        const routerPush = jest.fn()

        useRouterMock.mockReturnValue(
            // @ts-expect-error - we don't need to mock all the properties
            {
                push: routerPush,
            },
        )

        render(<CreateNewDocButton />)

        const button = screen.getByRole('button')

        button.click()

        expect(routerPush).toHaveBeenCalledExactlyOnceWith(`/docs/${newDocId}`)
    })
})
