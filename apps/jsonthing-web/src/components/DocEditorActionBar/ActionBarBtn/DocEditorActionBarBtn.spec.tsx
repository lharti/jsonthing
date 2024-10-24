import { TooltipProvider } from '@radix-ui/react-tooltip'
import { IconWand } from '@tabler/icons-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { PropsWithChildren } from 'react'
import { DocEditorActionBarBtn } from './DocEditorActionBarBtn'

const TooltipProviderWrapper: React.FC<PropsWithChildren> = ({ children }) => (
    <TooltipProvider>{children}</TooltipProvider>
)

describe('<DocEditorActionBarBtn />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(
            <DocEditorActionBarBtn
                label="action btn"
                Icon={IconWand}
                onClick={jest.fn()}
            />,

            {
                wrapper: TooltipProviderWrapper,
            },
        )

        expect(container).toMatchSnapshot('<DocEditorActionBarBtn />')
    })

    it('should render with icon only when used with iconOnly prop', () => {
        expect.assertions(1)

        const { container } = render(
            <DocEditorActionBarBtn
                iconOnly
                label="action btn"
                Icon={IconWand}
                onClick={jest.fn()}
            />,

            {
                wrapper: TooltipProviderWrapper,
            },
        )

        expect(container).toMatchSnapshot('<DocEditorActionBarBtn iconOnly/>')
    })

    it('should show tooltip on hover', async () => {
        expect.assertions(1)

        jest.useFakeTimers()

        const user = userEvent.setup()

        const { getByRole } = render(
            <DocEditorActionBarBtn
                label="action btn"
                Icon={IconWand}
                onClick={jest.fn()}
            />,

            {
                wrapper: TooltipProviderWrapper,
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
            <DocEditorActionBarBtn
                label="click me"
                Icon={IconWand}
                onClick={() => {
                    onClick()
                }}
            />,

            {
                wrapper: TooltipProviderWrapper,
            },
        )

        const button = screen.getByRole('button', { name: 'click me' })

        button.click()

        expect(onClick).toHaveBeenCalledOnce()
    })
})
