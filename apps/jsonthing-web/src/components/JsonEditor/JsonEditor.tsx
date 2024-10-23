'use client'

import { DocTitleEditor } from '@/components/DocTitleEditor'
import { JsonEditorActionBar } from '@/components/JsonEditorActionBar'
import { initCodeMirrorExtensions } from '@/lib/codemirror/extensions'
import { lightTheme } from '@/lib/codemirror/themes'
import { cn } from '@/lib/utils'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'

export interface JsonEditorProps {
    className?: string
    initialContent?: string
    initialTitle: string

    docId: string
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
    className,
    initialContent,
    initialTitle,

    docId,
}) => {
    const [editorContent, setEditorContent] = React.useState(
        initialContent || '',
    )

    return (
        <div className={cn(`flex flex-col`, className)}>
            <div className="mb-2 flex items-end justify-between">
                <DocTitleEditor initialTitle={initialTitle} docId={docId} />

                <JsonEditorActionBar
                    editorContent={editorContent}
                    setEditorContent={setEditorContent}
                />
            </div>

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
