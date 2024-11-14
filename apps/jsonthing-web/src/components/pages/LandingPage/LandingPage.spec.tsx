import { LandingPageHero } from '@/components/pages/LandingPage/LandingPageHero'
import { render } from '@testing-library/react'
import React from 'react'
import { LandingPage } from '.'

jest.mock('./LandingPageHero')

describe('<LandingPage />', () => {
    it('should render', () => {
        expect.assertions(1)

        jest.mocked(LandingPageHero).mockReturnValueOnce('{LANDING_PAGE_HERO}')

        const { container } = render(<LandingPage />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="
                          mx-auto max-w-screen-xl px-6 pt-32

                          2xl:px-0
                        "
              >
                <main>
                  {LANDING_PAGE_HERO}
                </main>
              </div>
            </div>
        `)
    })
})
