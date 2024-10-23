import { DocTitleEditor } from '@/components/DocTitleEditor'
import { JsonEditorActionBar } from '@/components/JsonEditorActionBar'
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

jest.mock('@/components/JsonEditorActionBar')
const JsonEditorActionBarMock = jest.mocked(JsonEditorActionBar)

jest.mock('@/components/DocTitleEditor')
const DocTitleEditorMock = jest.mocked(DocTitleEditor)

const useStateSpy = jest.spyOn(React, 'useState')

describe('<JsonEditor />', () => {
    it('should render', () => {
        expect.assertions(1)

        useStateSpy.mockReturnValue(['', jest.fn()])

        CodeMirrorMock.mockReturnValue(<div>{'CodeMirror'}</div>)

        JsonEditorActionBarMock.mockReturnValue(
            <div>{'JsonEditorActionBar'}</div>,
        )

        DocTitleEditorMock.mockReturnValue(<div>{'DocTitleEditor'}</div>)

        const { container } = render(
            <JsonEditor initialTitle="INITIAL_TITLE" docId="DOC_ID" />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="flex flex-col"
              >
                <div
                  class="mb-2 flex items-end justify-between"
                >
                  <div>
                    DocTitleEditor
                  </div>
                  <div>
                    JsonEditorActionBar
                  </div>
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

        const editorContent = Math.random()

        useStateSpy.mockReturnValue([editorContent, jest.fn()])

        // @ts-expect-error just a mock
        initCodeMirrorExtensionsMock.mockReturnValue('CODEMIRROR_EXTENSIONS')

        render(<JsonEditor initialTitle="INITIAL_TITLE" docId="DOC_ID" />)

        expect(CodeMirrorMock).toHaveBeenCalledExactlyOnceWith({
            autoFocus: true,

            value: editorContent,
            onChange: expect.any(Function),

            theme: lightTheme,
            extensions: ['CODEMIRROR_EXTENSIONS'],
        })
    })

    it("should update editor content on CodeMirror's change", () => {
        expect.assertions(1)

        const setEditorContent = jest.fn()
        useStateSpy.mockReturnValue(['content', setEditorContent])

        render(<JsonEditor initialTitle="INITIAL_TITLE" docId="DOC_ID" />)

        // eslint-disable-next-line jest/unbound-method
        const codeMirrorOnChange = CodeMirrorMock.mock.calls[0][0].onChange

        const newContent = Math.random()
        // @ts-expect-error: no need to pass viewUpdate
        codeMirrorOnChange(newContent)

        expect(setEditorContent).toHaveBeenCalledExactlyOnceWith(newContent)
    })

    it('should setup JsonEditorActionBar', () => {
        expect.assertions(1)

        const editorContent = Math.random()
        const setEditorContent = jest.fn()

        useStateSpy.mockReturnValue([editorContent, setEditorContent])

        render(<JsonEditor initialTitle="INITIAL_TITLE" docId="DOC_ID" />)

        expect(JsonEditorActionBarMock).toHaveBeenCalledExactlyOnceWith({
            editorContent,
            setEditorContent,
        })
    })

    it('should setup DocTitleEditor', () => {
        expect.assertions(1)

        const initialTitle = Math.random().toString()
        const docId = Math.random().toString()

        render(<JsonEditor initialTitle={initialTitle} docId={docId} />)

        expect(DocTitleEditorMock).toHaveBeenCalledExactlyOnceWith({
            initialTitle,
            docId,
        })
    })
})
