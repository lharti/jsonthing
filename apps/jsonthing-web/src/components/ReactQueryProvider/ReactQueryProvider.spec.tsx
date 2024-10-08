import { QueryClientContext } from '@tanstack/react-query'
import { render, renderHook } from '@testing-library/react'
import React from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'

describe('<ReactQueryProvider />', () => {
    it('should render children', () => {
        expect.assertions(1)

        const { container } = render(
            <ReactQueryProvider>
                <div>{'Test Child'}</div>
            </ReactQueryProvider>,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                Test Child
              </div>
            </div>
        `)
    })

    it('should initialize query client context', () => {
        expect.assertions(1)

        const { result } = renderHook(
            () => React.useContext(QueryClientContext),
            {
                wrapper: ReactQueryProvider,
            },
        )

        expect(result).toMatchInlineSnapshot(`
            {
              "current": QueryClient {},
            }
        `)
    })
})
