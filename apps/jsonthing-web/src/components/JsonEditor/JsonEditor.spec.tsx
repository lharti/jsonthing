import { JsonEditorActionBar } from '@/components/JsonEditor/ActionBar'
import { initCodeMirrorExtensions } from '@/lib/codemirror/extensions'
import { lightTheme } from '@/lib/codemirror/themes'
import { render } from '@testing-library/react'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'
import { JsonEditor } from './JsonEditor'

jest.mock('@uiw/react-codemirror')
const CodeMirrorMock = jest.mocked(CodeMirror)

jest.mock('@/lib/codemirror/extensions')
const initCodeMirrorExtensionsMock = jest.mocked(initCodeMirrorExtensions)

jest.mock('./ActionBar')
const JsonEditorActionBarMock = jest.mocked(JsonEditorActionBar)

describe('<JsonEditor />', () => {
    it('should render', () => {
        expect.assertions(1)

        CodeMirrorMock.mockReturnValue(<div>{'CodeMirror'}</div>)

        JsonEditorActionBarMock.mockReturnValue(
            <div>{'JsonEditorActionBar'}</div>,
        )

        const { container } = render(<JsonEditor />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="flex flex-col"
              >
                <div>
                  JsonEditorActionBar
                </div>
                <div>
                  CodeMirror
                </div>
              </div>
            </div>
        `)
    })

    it('should setup codemirror editor', () => {
        expect.assertions(1)

        const codeMirrorExtensions = ['CODE_MIRROR_EXTENSIONS']
        // @ts-expect-error: we are just mocking
        initCodeMirrorExtensionsMock.mockReturnValue(codeMirrorExtensions)

        const useStateSpy = jest.spyOn(React, 'useState')

        const editorContent = '{"key": "value"}'
        useStateSpy.mockReturnValue([editorContent, jest.fn()])

        render(<JsonEditor />)

        expect(CodeMirrorMock).toHaveBeenCalledExactlyOnceWith({
            autoFocus: true,

            value: editorContent,
            onChange: expect.any(Function),

            theme: lightTheme,
            extensions: [codeMirrorExtensions],
        })
    })

    it('should setup JsonEditorActionBar', () => {
        expect.assertions(1)

        const useStateSpy = jest.spyOn(React, 'useState')

        const editorContent = '{"key": "value"}'
        const setEditorContent = jest.fn()

        useStateSpy.mockReturnValue([editorContent, setEditorContent])

        render(<JsonEditor />)

        expect(JsonEditorActionBarMock).toHaveBeenCalledExactlyOnceWith({
            editorContent,
            setEditorContent,
            className: 'self-end',
        })
    })
})
