import { Button } from '@/components/ui/Button'
import { SignUpButton as ClerkSignUpButton } from '@clerk/nextjs'
import { render, screen } from '@testing-library/react'
import { SignUpButton } from './SignUpButton'

jest.mock('@/components/ui/Button')
jest.mock('@clerk/nextjs')

const ButtonMock = jest.mocked(Button)
const ClerkSignUpButtonMock = jest.mocked(ClerkSignUpButton)

describe('<SignUpButton />', () => {
    it('should use <ClerkSignUpButton />', () => {
        expect.assertions(1)

        const ClerkSignUpButtonMock = jest.mocked(ClerkSignUpButton)

        render(<SignUpButton />)

        expect(ClerkSignUpButtonMock).toHaveBeenCalledOnce()
    })

    it('should render custom sign-up button', () => {
        expect.assertions(1)

        ButtonMock.mockImplementation(({ children, ...otherProps }) => (
            <button {...otherProps}>{children}</button>
        ))

        ClerkSignUpButtonMock.mockImplementation(({ children }) => (
            <div data-testid="root-element">{children}</div>
        ))

        render(<SignUpButton />)

        const rootElement = screen.getByTestId('root-element')

        expect(rootElement).toMatchInlineSnapshot(`
            <div
              data-testid="root-element"
            >
              <button
                class="mr-2"
              >
                Sign un
              </button>
            </div>
        `)
    })
})
