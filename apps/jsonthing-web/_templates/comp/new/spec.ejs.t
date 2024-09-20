---
to: "src/components/<%= path ? path + '/' : '' %><%= name %>/<%= name %>.spec.tsx"
---
import { render } from '@testing-library/react'
import React from 'react'
import { <%= name%> } from './<%= name%>'

describe('<<%= name %> />', () => {
    it('should render', () => {
        expect.assertions(1)

        const title = 'Hello from Test!'

        const { container } = render(<Test title={title} />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                <h1>
                  Hello from Test!
                </h1>
              </div>
            </div>
        `)
    })
})
