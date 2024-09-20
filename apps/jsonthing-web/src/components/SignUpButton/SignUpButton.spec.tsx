import { Button, ButtonProps } from '@/components/ui/Button'
import { SignUpButton as ClerkSignUpButton } from '@clerk/nextjs'
import { render } from '@testing-library/react'
import { SignUpButton } from './SignUpButton'

jest.mock('@/components/ui/Button')
jest.mock('@clerk/nextjs')

const ButtonMock = jest.mocked(Button)
const ClerkSignUpButtonMock = jest.mocked(ClerkSignUpButton)

describe('<SignUpButton />', () => {
    it('should render custom sign up button', () => {
        expect.assertions(1)

        ButtonMock.mockImplementation(({ children, ...otherProps }) => (
            <button {...otherProps}>{children}</button>
        ))

        ClerkSignUpButtonMock.mockImplementation(({ children }) => (
            <>{children}</>
        ))

        const { container } = render(<SignUpButton />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <button>
                Sign up
              </button>
            </div>
        `)
    })

    it('should pass props to <Button />', () => {
        expect.assertions(1)

        ClerkSignUpButtonMock.mockImplementation(({ children }) => (
            <>{children}</>
        ))

        const buttonProps: ButtonProps = {
            className: 'm-3 ms-2 bg-red-50',
            disabled: true,
            onClick: jest.fn(),
            variant: 'secondary',
        }

        render(<SignUpButton {...buttonProps} />)

        expect(ButtonMock).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining(buttonProps),
            undefined,
        )
    })
})
