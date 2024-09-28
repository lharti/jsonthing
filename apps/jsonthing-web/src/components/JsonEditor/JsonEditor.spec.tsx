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

describe('<JsonEditor />', () => {
    it('should render', () => {
        expect.assertions(1)

        CodeMirrorMock.mockReturnValue(<div>{'CodeMirror'}</div>)

        const { container } = render(<JsonEditor />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
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

        render(<JsonEditor />)

        expect(CodeMirrorMock).toHaveBeenCalledExactlyOnceWith({
            autoFocus: true,

            value: expect.any(String),
            onChange: expect.any(Function),

            theme: lightTheme,
            extensions: [codeMirrorExtensions],
        })
    })
})
