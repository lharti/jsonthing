import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter } from '@codemirror/lint'
import { EditorView } from '@codemirror/view'

export const initCodeMirrorExtensions = () => [
    json(),

    linter(jsonParseLinter()),

    EditorView.lineWrapping,
    EditorView.theme({
        '&.cm-focused': {
            outline: 'none',
        },

        '.cm-gutterElement.cm-activeLineGutter': {
            backgroundColor: 'transparent',
        },
    }),
]
