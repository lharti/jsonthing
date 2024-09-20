import { SignInButton } from '@/components/SignInButton'
import { SignUpButton } from '@/components/SignUpButton'
import { render } from '@testing-library/react'
import React from 'react'
import { NavbarAuthButtons } from './NavbarAuthButtons'

jest.mock('@/components/SignInButton')
jest.mock('@/components/SignUpButton')

describe('<NavbarAuthButtons />', () => {
    it('should render auth buttons', () => {
        expect.assertions(1)

        const SignInButtonMock = jest.mocked(SignInButton)
        const SignUpButtonMock = jest.mocked(SignUpButton)

        SignInButtonMock.mockReturnValue(<button>{'Sign In'}</button>)
        SignUpButtonMock.mockReturnValue(<button>{'Sign Up'}</button>)

        const { container } = render(<NavbarAuthButtons />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                id="auth-buttons-container"
              >
                <button>
                  Sign In
                </button>
                <button>
                  Sign Up
                </button>
              </div>
            </div>
        `)
    })

    it('should pass props to div#auth-buttons-container', () => {
        expect.assertions(1)

        render(<NavbarAuthButtons className="m-3 bg-slate-50 p-4" />)

        const authButtonsContainer = document.getElementById(
            'auth-buttons-container',
        )

        expect(authButtonsContainer).toMatchInlineSnapshot(`
            <div
              class="m-3 bg-slate-50 p-4"
              id="auth-buttons-container"
            />
        `)
    })
})
