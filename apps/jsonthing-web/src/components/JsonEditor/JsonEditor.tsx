'use client'
import { initCodeMirrorExtensions } from '@/lib/codemirror/extensions'
import { lightTheme } from '@/lib/codemirror/themes'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'

export interface JsonEditorProps {
    className?: string
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ className }) => {
    const [editorContent, setEditorContent] = React.useState('{}')

    return (
        <div className={className}>
            <CodeMirror
                autoFocus
                value={editorContent}
                theme={lightTheme}
                extensions={[initCodeMirrorExtensions()]}
                onChange={value => {
                    setEditorContent(value)
                }}
            />
        </div>
    )
}
