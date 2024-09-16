import { Button } from '@/components/ui/Button'
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'
import { render, screen } from '@testing-library/react'
import { SignInButton } from './SignInButton'

jest.mock('@/components/ui/Button')
jest.mock('@clerk/nextjs')

const ButtonMock = jest.mocked(Button)
const ClerkSignInButtonMock = jest.mocked(ClerkSignInButton)

describe('<SignInButton />', () => {
    it('should use <ClerkSignInButton />', () => {
        expect.assertions(1)

        const ClerkSignInButtonMock = jest.mocked(ClerkSignInButton)

        render(<SignInButton />)

        expect(ClerkSignInButtonMock).toHaveBeenCalledOnce()
    })

    it('should render custom sign-in button', () => {
        expect.assertions(1)

        ButtonMock.mockImplementation(({ children, ...otherProps }) => (
            <button {...otherProps}>{children}</button>
        ))

        ClerkSignInButtonMock.mockImplementation(({ children }) => (
            <div data-testid="root-element">{children}</div>
        ))

        render(<SignInButton />)

        const rootElement = screen.getByTestId('root-element')

        expect(rootElement).toMatchInlineSnapshot(`
            <div
              data-testid="root-element"
            >
              <button
                class="mr-2"
                variant="ghost"
              >
                Sign in
              </button>
            </div>
        `)
    })
})
