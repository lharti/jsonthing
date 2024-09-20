import { Button, ButtonProps } from '@/components/ui/Button'
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'
import { render } from '@testing-library/react'
import { SignInButton } from './SignInButton'

jest.mock('@/components/ui/Button')
jest.mock('@clerk/nextjs')

const ClerkSignInButtonMock = jest.mocked(ClerkSignInButton)
const ButtonMock = jest.mocked(Button)

describe('<SignInButton />', () => {
    it('should render custom sign in button', () => {
        expect.assertions(1)

        ButtonMock.mockImplementation(({ children, ...otherProps }) => (
            <button {...otherProps}>{children}</button>
        ))

        ClerkSignInButtonMock.mockImplementation(({ children }) => (
            <>{children}</>
        ))

        const { container } = render(<SignInButton />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <button
                variant="ghost"
              >
                Sign in
              </button>
            </div>
        `)
    })

    it('should pass props to <Button />', () => {
        expect.assertions(1)

        ClerkSignInButtonMock.mockImplementation(({ children }) => (
            <>{children}</>
        ))

        const buttonProps: ButtonProps = {
            className: 'm-2 ms-5 bg-red-50',
            disabled: true,
            onClick: jest.fn(),
        }

        render(<SignInButton {...buttonProps} />)

        expect(ButtonMock).toHaveBeenCalledWith(
            expect.objectContaining(buttonProps),
            undefined,
        )
    })
})
