import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { EditableHeading, UIMode } from './index'

describe('<EditableHeading />', () => {
    it('should render with view ui mode by default', () => {
        expect.assertions(2)

        const { container } = render(
            <EditableHeading initialValue="TEXT_VALUE" />,
        )

        const heading = screen.getByRole('heading')

        expect(container).toMatchSnapshot('EditableHeading - View mode')

        expect(heading).not.toHaveFocus()
    })

    it('should render edit ui mode', () => {
        expect.assertions(2)

        const { container } = render(
            <EditableHeading
                initialValue="TEXT_VALUE"
                initialUIMode={UIMode.EDIT}
            />,
        )

        const heading = screen.queryByRole('input')

        expect(container).toMatchSnapshot('EditableHeading - Edit mode')

        expect(heading).toHaveFocus()
    })

    describe('heading', () => {
        it('should switch to edit mode on focus', () => {
            expect.assertions(1)

            render(<EditableHeading initialValue="TEXT_VALUE" />)

            const heading = screen.getByRole('heading')

            act(() => {
                heading.focus()
            })

            const headingInput = screen.queryByRole('input')

            expect(headingInput).toBeInTheDocument()
        })

        it('should switch to view mode on Enter key press', async () => {
            expect.assertions(2)

            const user = userEvent.setup()

            render(
                <EditableHeading
                    initialValue="INITIAL_VALUE"
                    initialUIMode={UIMode.EDIT}
                />,
            )

            const heading = screen.getByRole('input')

            await act(async () => {
                await user.type(heading, '{enter}')
            })

            expect(heading).toHaveAttribute('role', 'heading')

            expect(heading).not.toHaveFocus()
        })

        it('should call onChange with new value on enter key press', async () => {
            expect.assertions(1)

            const user = userEvent.setup()

            const initialValue = 'INITIAL_VALUE'
            const onChange = jest.fn()

            render(
                <EditableHeading
                    initialValue={initialValue}
                    onChange={onChange}
                />,
            )

            const heading = screen.getByRole('heading')

            const randomText = Math.random().toString()

            await act(async () => {
                await user.click(heading)
                await user.type(heading, `${randomText}{enter}`)
            })

            const newHeadingText = initialValue + randomText

            expect(onChange).toHaveBeenCalledExactlyOnceWith(newHeadingText)
        })

        it('should update textContent with typed values', async () => {
            expect.assertions(1)

            const user = userEvent.setup()

            const initialValue = 'INITIAL_VALUE'

            render(
                <EditableHeading
                    initialValue={initialValue}
                    initialUIMode={UIMode.EDIT}
                />,
            )

            const heading = screen.getByRole('input')

            const randomText = Math.random().toString()

            await act(async () => {
                await user.type(heading, `${randomText}`)
            })

            const newHeadingText = initialValue + randomText

            expect(heading).toHaveTextContent(newHeadingText)
        })
    })

    describe('edit button', () => {
        it('should switch to edit mode on click', () => {
            expect.assertions(1)

            render(<EditableHeading initialValue="TEXT_VALUE" />)

            const editButton = screen.getByRole('button')

            act(() => {
                editButton.click()
            })

            const headingInput = screen.queryByRole('input')

            expect(headingInput).toBeInTheDocument()
        })

        it('should switch to view mode on click if current mode is edit', () => {
            expect.assertions(1)

            render(
                <EditableHeading
                    initialValue="TEXT_VALUE"
                    initialUIMode={UIMode.EDIT}
                />,
            )

            const editButton = screen.getByRole('button')

            act(() => {
                editButton.click()
            })

            const heading = screen.queryByRole('heading')

            expect(heading).toBeInTheDocument()
        })

        it('should call onChange with new value on click if current mode is edit', async () => {
            expect.assertions(1)

            const user = userEvent.setup()

            const initialValue = 'INITIAL_VALUE'
            const onChange = jest.fn()

            render(
                <EditableHeading
                    initialValue={initialValue}
                    initialUIMode={UIMode.EDIT}
                    onChange={onChange}
                />,
            )

            const editButton = screen.getByRole('button')
            const headingInput = screen.getByRole('input')

            const randomText = Math.random().toString()

            await act(async () => {
                await user.type(headingInput, `${randomText}`)

                await user.click(editButton)
            })

            const newHeadingText = initialValue + randomText

            expect(onChange).toHaveBeenCalledExactlyOnceWith(newHeadingText)
        })
    })
})
