import { render } from '@testing-library/react'
import React from 'react'
import { NavbarAuthButtons } from './AuthButtons'
import { Navbar } from './Navbar'

jest.mock('./AuthButtons')
const NavbarAuthButtonsMock = jest.mocked(NavbarAuthButtons)

describe('<Navbar />', () => {
    it('should render', () => {
        expect.assertions(1)

        NavbarAuthButtonsMock.mockImplementation(props => (
            <div {...props} id="navbar-auth-buttons" />
        ))

        const { container } = render(<Navbar />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <header
                class="sticky top-0 z-50 w-full backdrop-blur-[1px]"
              >
                <div
                  class="container mx-auto flex max-w-screen-xl p-4"
                >
                  <div
                    class="ml-auto"
                    id="navbar-auth-buttons"
                  />
                </div>
              </header>
            </div>
        `)
    })
})
