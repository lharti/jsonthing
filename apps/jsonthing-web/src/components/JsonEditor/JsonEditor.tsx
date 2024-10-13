'use client'

import { JsonEditorActionBar } from '@/components/JsonEditorActionBar'
import { initCodeMirrorExtensions } from '@/lib/codemirror/extensions'
import { lightTheme } from '@/lib/codemirror/themes'
import { cn } from '@/lib/utils'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'

export interface JsonEditorProps {
    className?: string
    initialContent?: string
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
    className,
    initialContent,
}) => {
    const [editorContent, setEditorContent] = React.useState(
        initialContent || '',
    )

    return (
        <div className={cn(`flex flex-col`, className)}>
            <JsonEditorActionBar
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                className="self-end"
            />

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
