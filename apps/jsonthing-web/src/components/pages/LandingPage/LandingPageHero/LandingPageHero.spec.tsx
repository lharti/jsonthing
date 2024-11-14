import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import { render } from '@testing-library/react'
import React from 'react'
import { LandingPageHero } from '.'

jest.mock('@/components/CreateNewDocButton')

describe('<LandingPageHero />', () => {
    it('should render', () => {
        expect.assertions(1)

        jest.mocked(CreateNewDocButton).mockReturnValueOnce(
            <button>{'Create new JSON doc'}</button>,
        )

        const { container } = render(<LandingPageHero />)

        expect(container).toMatchSnapshot('<LandingPageHero />')
    })
})
