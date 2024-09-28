import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter } from '@codemirror/lint'
import { EditorView } from '@codemirror/view'
import { initCodeMirrorExtensions } from './codemirror-extensions'

jest.mock('@codemirror/lang-json')
const jsonMock = jest.mocked(json)
const jsonParseLinterMock = jest.mocked(jsonParseLinter)

jest.mock('@codemirror/lint')
const linterMock = jest.mocked(linter)

jest.mock('@codemirror/view')
const editorViewMock = jest.mocked(EditorView)

describe('codeMirrorExtensions', () => {
    it('should return JSON language support extension', () => {
        expect.assertions(1)

        // @ts-expect-error: we are just mocking
        jsonMock.mockReturnValue('JSON_LANGUAGE_SUPPORT')

        expect(initCodeMirrorExtensions()).toContainEqual(
            'JSON_LANGUAGE_SUPPORT',
        )
    })

    it('should return JSON parse linter extension', () => {
        expect.assertions(1)

        // @ts-expect-error: chill, we are just mocking
        jsonParseLinterMock.mockReturnValue('JSON_PARSE_LINT_SOURCE')

        // @ts-expect-error: chill man
        linterMock.mockImplementation(lintSource => ({
            lintSource,
        }))

        expect(initCodeMirrorExtensions()).toContainEqual({
            lintSource: 'JSON_PARSE_LINT_SOURCE',
        })
    })

    it('should enable line wrapping', () => {
        expect.assertions(1)

        expect(initCodeMirrorExtensions()).toContainEqual(
            EditorView.lineWrapping,
        )
    })

    it('should set custom styling', () => {
        expect.assertions(1)

        // @ts-expect-error: chill, we are just mocking
        editorViewMock.theme.mockImplementation(style => style)

        const extensions = initCodeMirrorExtensions()

        expect(extensions).toContainEqual({
            '&.cm-focused': {
                outline: 'none',
            },

            '.cm-gutterElement.cm-activeLineGutter': {
                backgroundColor: 'transparent',
            },
        })
    })

    it('should return four extensions', () => {
        expect.assertions(1)

        expect(initCodeMirrorExtensions()).toHaveLength(4)
    })
})
