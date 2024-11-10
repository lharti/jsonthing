'use client'

import { DocEditorActionBar } from '@/components/DocEditorActionBar'
import { DocTitleEditor } from '@/components/DocTitleEditor'
import { initCodeMirrorExtensions } from '@/lib/codemirror/extensions'
import { lightTheme } from '@/lib/codemirror/themes'
import { cn } from '@/lib/utils'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'

export interface DocEditorProps {
    className?: string
    initialContent?: object
    initialTitle: string

    docId: string
}

export const DocEditor: React.FC<DocEditorProps> = ({
    className,
    initialContent,
    initialTitle,

    docId,
}) => {
    const [editorContent, setEditorContent] = React.useState(
        JSON.stringify(initialContent, null, 2),
    )

    return (
        <div className={cn(`flex flex-col`, className)}>
            <div className="mb-2 flex items-end justify-between">
                <DocTitleEditor initialTitle={initialTitle} docId={docId} />

                <DocEditorActionBar
                    value={editorContent}
                    docId={docId}
                    onChange={newValue => setEditorContent(newValue)}
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
