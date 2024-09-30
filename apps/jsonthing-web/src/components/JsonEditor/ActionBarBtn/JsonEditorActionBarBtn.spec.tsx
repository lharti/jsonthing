import { TooltipProvider } from '@radix-ui/react-tooltip'
import { IconWand } from '@tabler/icons-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { JsonEditorActionBarBtn } from './JsonEditorActionBarBtn'

describe('<JsonEditorActionBarBtn />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(
            <JsonEditorActionBarBtn
                label="action btn"
                Icon={IconWand}
                onClick={jest.fn()}
            />,

            {
                wrapper: ({ children }) => (
                    <TooltipProvider>{children}</TooltipProvider>
                ),
            },
        )

        expect(container).toMatchSnapshot('<JsonEditorActionBarBtn />')
    })

    it('should show tooltip on hover', async () => {
        expect.assertions(1)

        jest.useFakeTimers()

        const user = userEvent.setup()

        const { getByRole } = render(
            <JsonEditorActionBarBtn
                label="action btn"
                Icon={IconWand}
                onClick={jest.fn()}
            />,

            {
                wrapper: ({ children }) => (
                    <TooltipProvider>{children}</TooltipProvider>
                ),
            },
        )

        const button = getByRole('button')

        user.hover(button)
        jest.runAllTimers()

        const tooltip = await screen.findByRole('tooltip')

        expect(tooltip).toHaveTextContent('action btn')
    })

    it('should handle click event', () => {
        expect.assertions(1)

        const onClick = jest.fn(() => "I'm clicked")
        render(
            <JsonEditorActionBarBtn
                label="click me"
                Icon={IconWand}
                onClick={() => {
                    onClick()
                }}
            />,

            {
                wrapper: ({ children }) => (
                    <TooltipProvider>{children}</TooltipProvider>
                ),
            },
        )

        const button = screen.getByRole('button', { name: 'click me' })

        button.click()

        expect(onClick).toHaveBeenCalledOnce()
    })
})
