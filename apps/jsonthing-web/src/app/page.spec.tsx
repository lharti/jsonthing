import { LandingPage } from '@/components/pages/LandingPage'
import { render } from '@testing-library/react'
import React from 'react'
import Home from './page'

jest.mock('@/components/pages/LandingPage')

describe('<Home />', () => {
    it('should use <LandingPage />', () => {
        expect.assertions(1)

        const LandingPageMock = jest.mocked(LandingPage)

        LandingPageMock.mockReturnValueOnce('LANDING_PAGE_COMPONENT')

        const { container } = render(<Home />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              LANDING_PAGE_COMPONENT
            </div>
        `)
    })
})
