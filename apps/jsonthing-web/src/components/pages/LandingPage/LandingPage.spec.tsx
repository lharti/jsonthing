import { render } from '@testing-library/react'
import React from 'react'
import { LandingPage } from './LandingPage'

jest.mock('@/components/CreateNewDocButton')

describe('<LandingPage />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(<LandingPage />)

        expect(container).toMatchSnapshot('<LandingPage />')
    })
})
