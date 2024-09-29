import { render, screen } from '@testing-library/react'
import React from 'react'
import { JsonEditorActionBar } from './JsonEditorActionBar'

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

        screen.getByText('Prettify').click()

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
