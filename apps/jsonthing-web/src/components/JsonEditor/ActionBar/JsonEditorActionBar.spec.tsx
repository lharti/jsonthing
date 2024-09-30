import { Button } from '@/components/ui/Button'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { JsonEditorActionBar } from './JsonEditorActionBar'

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('../ActionBarBtn', () => ({
    // @ts-expect-error - mom said it's okay
    JsonEditorActionBarBtn: ({ onClick, label }) => (
        <Button role="button" aria-label={label} onClick={onClick} />
    ),
}))

describe('<JsonEditorActionBar />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(
            <JsonEditorActionBar
                editorContent="{}"
                setEditorContent={jest.fn()}
            />,
        )

        expect(container).toMatchSnapshot('<JsonEditorActionBar />')
    })

    it('should prettify editor content', () => {
        expect.assertions(1)

        const setEditorContent = jest.fn(value => value)

        const uglyJson = `
            {"a":1,"b":2,
            "c": 3}`

        render(
            <JsonEditorActionBar
                editorContent={uglyJson}
                setEditorContent={setEditorContent}
            />,
        )

        screen
            .getByRole('button', {
                name: 'Prettify',
            })
            .click()

        const newEditorContent = setEditorContent.mock.results[0].value

        expect(newEditorContent).toMatchInlineSnapshot(`
            "{
              "a": 1,
              "b": 2,
              "c": 3
            }"
        `)
    })
})
