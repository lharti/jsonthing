import { DocEditorActionBar } from '@/components/DocEditorActionBar'
import { DocTitleEditor } from '@/components/DocTitleEditor'
import { initCodeMirrorExtensions } from '@/lib/codemirror/extensions'
import { lightTheme } from '@/lib/codemirror/themes'
import { render, screen } from '@testing-library/react'
import CodeMirror from '@uiw/react-codemirror'
import React, { act } from 'react'
import { DocEditor } from './DocEditor'

jest.mock('@uiw/react-codemirror')
jest.mock('@/lib/codemirror/extensions')
jest.mock('@/components/DocEditorActionBar')
jest.mock('@/components/DocTitleEditor')

const setupMocks = () => {
    const DocTitleEditorMock = jest.mocked(DocTitleEditor)
    const DocEditorActionBarMock = jest.mocked(DocEditorActionBar)
    const initCodeMirrorExtensionsMock = jest.mocked(initCodeMirrorExtensions)
    const CodeMirrorMock = jest.mocked(CodeMirror)

    CodeMirrorMock.mockImplementation(({ value }) => (
        <p id="code-mirror">{value}</p>
    ))

    DocEditorActionBarMock.mockImplementation(({ value }) => (
        <p id="action-bar">{value}</p>
    ))

    DocTitleEditorMock.mockImplementation(({ initialTitle }) => (
        <h1>{initialTitle}</h1>
    ))

    return {
        DocTitleEditorMock,
        DocEditorActionBarMock,
        initCodeMirrorExtensionsMock,
        CodeMirrorMock,
    }
}

describe('<DocEditor />', () => {
    it('should render- with valid json', () => {
        expect.assertions(1)

        setupMocks()
        const { container } = render(
            <DocEditor
                initialTitle="INITIAL_TITLE"
                docId="DOC_ID"
                initialContent="{}"
            />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="flex flex-col"
              >
                <div
                  class="mb-2 flex items-end justify-between"
                >
                  <h1>
                    INITIAL_TITLE
                  </h1>
                  <p
                    id="action-bar"
                  >
                    {}
                  </p>
                </div>
                <p
                  id="code-mirror"
                >
                  {}
                </p>
              </div>
            </div>
        `)
    })

    it('should render- with invalid json', () => {
        expect.assertions(1)

        setupMocks()

        const { container } = render(
            <DocEditor
                initialTitle="INITIAL_TITLE"
                docId="DOC_ID"
                initialContent="{"
            />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="flex flex-col"
              >
                <div
                  class="mb-2 flex items-end justify-between"
                >
                  <div
                    class="relative w-full rounded-lg border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7 border-red-500/50 text-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:dark:border-red-900 dark:text-red-900 dark:[&>svg]:text-red-900 animate-fadeIn"
                    role="alert"
                  >
                    Expected property name or '}' in JSON at position 1
                  </div>
                </div>
                <p
                  id="code-mirror"
                >
                  {
                </p>
              </div>
            </div>
        `)
    })

    it('should setup codemirror editor', () => {
        expect.assertions(1)

        const { initCodeMirrorExtensionsMock, CodeMirrorMock } = setupMocks()

        // @ts-expect-error: just a mock
        initCodeMirrorExtensionsMock.mockReturnValue('CODEMIRROR_EXTENSIONS')

        render(
            <DocEditor
                initialTitle="INITIAL_TITLE"
                docId="DOC_ID"
                initialContent="{}"
            />,
        )

        expect(CodeMirrorMock).toHaveBeenCalledExactlyOnceWith({
            autoFocus: true,

            value: '{}',
            onChange: expect.any(Function),

            theme: lightTheme,
            extensions: ['CODEMIRROR_EXTENSIONS'],
        })
    })

    it("should update editor content on CodeMirror's change", () => {
        expect.assertions(1)

        const { CodeMirrorMock } = setupMocks()

        render(
            <DocEditor
                initialContent="{}"
                initialTitle="INITIAL_TITLE"
                docId="DOC_ID"
            />,
        )

        // eslint-disable-next-line jest/unbound-method
        const codeMirrorOnChange = CodeMirrorMock.mock.calls[0][0].onChange

        act(() => {
            // @ts-expect-error: no need to mock useState
            codeMirrorOnChange(`["NEW_VALUE_FROM_CODE_MIRROR"]`)
        })

        const updatedContent = screen.queryAllByText(
            `["NEW_VALUE_FROM_CODE_MIRROR"]`,
        )

        expect(updatedContent).toMatchInlineSnapshot(`
            [
              <p
                id="action-bar"
              >
                ["NEW_VALUE_FROM_CODE_MIRROR"]
              </p>,
              <p
                id="code-mirror"
              >
                ["NEW_VALUE_FROM_CODE_MIRROR"]
              </p>,
            ]
        `)
    })

    it('should update editor content on ActionBar change', () => {
        expect.assertions(1)

        const { DocEditorActionBarMock } = setupMocks()

        render(
            <DocEditor
                initialContent="{}"
                initialTitle="INITIAL_TITLE"
                docId="DOC_ID"
            />,
        )

        const actionBarChange = DocEditorActionBarMock.mock.calls[0][0].onChange

        act(() => {
            actionBarChange(`["NEW_VALUE_FROM_ACTION_BAR"]`)
        })

        const updatedContent = screen.queryAllByText(
            `["NEW_VALUE_FROM_ACTION_BAR"]`,
        )

        expect(updatedContent).toMatchInlineSnapshot(`
            [
              <p
                id="action-bar"
              >
                ["NEW_VALUE_FROM_ACTION_BAR"]
              </p>,
              <p
                id="code-mirror"
              >
                ["NEW_VALUE_FROM_ACTION_BAR"]
              </p>,
            ]
        `)
    })

    it('should setup DocEditorActionBar', () => {
        expect.assertions(1)

        const { DocEditorActionBarMock } = setupMocks()

        render(
            <DocEditor
                initialTitle="INITIAL_TITLE"
                docId="DOC_ID"
                initialContent="true"
            />,
        )

        expect(DocEditorActionBarMock).toHaveBeenCalledExactlyOnceWith({
            docId: 'DOC_ID',
            value: 'true',
            onChange: expect.any(Function),
        })
    })

    it('should setup DocTitleEditor', () => {
        expect.assertions(1)

        const { DocTitleEditorMock } = setupMocks()

        const initialTitle = Math.random().toString()
        const docId = Math.random().toString()

        render(
            <DocEditor
                initialTitle={initialTitle}
                docId={docId}
                initialContent="{}"
            />,
        )

        expect(DocTitleEditorMock).toHaveBeenCalledExactlyOnceWith({
            initialTitle,
            docId,
        })
    })
})
