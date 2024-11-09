import { TooltipProvider } from '@/components/ui/Tooltip'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { act } from 'react'
import { DocEndpoint } from './DocEndpoint'

describe('<DocEndpoint />', () => {
    it('should render', () => {
        expect.assertions(1)

        process.env.NEXT_PUBLIC_API_URL = 'API_URL'

        const { container } = render(<DocEndpoint docId="DOC_ID" />, {
            wrapper: TooltipProvider,
        })

        expect(container).toMatchSnapshot()
    })

    it('should copy endpoint URL to clipboard', async () => {
        expect.assertions(1)

        userEvent.setup()

        process.env.NEXT_PUBLIC_API_URL = 'API_URL'

        const { getByRole } = render(<DocEndpoint docId="DOC_ID" />, {
            wrapper: TooltipProvider,
        })

        const copyButton = getByRole('button', { name: 'Copy endpoint URL' })

        await act(async () => {
            await copyButton.click()
        })

        const clipboardContent = await navigator.clipboard.readText()

        expect(clipboardContent).toMatchInlineSnapshot(`"API_URL/dc/DOC_ID"`)
    })
})
