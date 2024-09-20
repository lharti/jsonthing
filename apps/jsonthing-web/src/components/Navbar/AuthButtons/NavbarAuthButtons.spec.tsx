import { SignInButton } from '@/components/SignInButton'
import { SignUpButton } from '@/components/SignUpButton'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { render } from '@testing-library/react'
import React from 'react'
import { NavbarAuthButtons } from './NavbarAuthButtons'

jest.mock('@/components/SignInButton')
jest.mock('@/components/SignUpButton')

jest.mock('@clerk/nextjs')

const SignInButtonMock = jest.mocked(SignInButton)
const SignUpButtonMock = jest.mocked(SignUpButton)

const SignedOutMock = jest.mocked(SignedOut)
const SignedInMock = jest.mocked(SignedIn)

const UserButtonMock = jest.mocked(UserButton)

describe('<NavbarAuthButtons />', () => {
    it('should render auth buttons if user signed out', () => {
        expect.assertions(1)

        SignInButtonMock.mockReturnValue(<button>{'Sign In'}</button>)
        SignUpButtonMock.mockReturnValue(<button>{'Sign Up'}</button>)

        SignedOutMock.mockImplementation(({ children }) => <>{children}</>)

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

    it('should render UserButton if user signed in', () => {
        expect.assertions(1)

        UserButtonMock.mockReturnValue(<button>{'User'}</button>)

        SignedInMock.mockImplementation(({ children }) => <>{children}</>)

        const { container } = render(<NavbarAuthButtons />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                id="auth-buttons-container"
              >
                <button>
                  User
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
