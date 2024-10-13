import { render } from '@testing-library/react'
import React from 'react'
import { Navbar } from './Navbar'

describe('<Navbar />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(<Navbar />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <header
                class="sticky top-0 z-50 w-full backdrop-blur-[1px]"
              >
                <div
                  class="container mx-auto flex max-w-screen-xl p-4"
                />
              </header>
            </div>
        `)
    })
})
