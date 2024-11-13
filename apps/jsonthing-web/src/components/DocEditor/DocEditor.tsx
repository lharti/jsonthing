'use client'

import { DocEditorActionBar } from '@/components/DocEditorActionBar'
import { DocTitleEditor } from '@/components/DocTitleEditor'
import { Alert } from '@/components/ui/Alert'
import { initCodeMirrorExtensions } from '@/lib/codemirror/extensions'
import { lightTheme } from '@/lib/codemirror/themes'
import { cn } from '@/lib/utils'
import CodeMirror from '@uiw/react-codemirror'
import React, { useEffect } from 'react'

export interface DocEditorProps {
    className?: string
    initialContent: string
    initialTitle: string

    docId: string
}

export const DocEditor: React.FC<DocEditorProps> = ({
    className,
    initialContent,
    initialTitle,

    docId,
}) => {
    const [editorContent, setEditorContent] = React.useState(initialContent)

    const [lintError, setLintError] = React.useState<string | null>(null)

    // check if the content is valid JSON
    useEffect(() => {
        try {
            JSON.parse(editorContent)

            setLintError(null)
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err)

            setLintError(errorMsg.replace(/^JSON.parse: /, ''))
        }
    }, [editorContent])

    return (
        <div className={cn(`flex flex-col space-y-2`, className)}>
            <div className="flex flex-wrap items-end justify-between">
                <DocTitleEditor initialTitle={initialTitle} docId={docId} />

                <DocEditorActionBar
                    value={editorContent}
                    docId={docId}
                    disabled={!!lintError}
                    className="ml-auto"
                    onChange={newValue => setEditorContent(newValue)}
                />
            </div>

            {lintError && (
                <Alert variant="destructive" className="animate-fade-in">
                    {lintError}
                </Alert>
            )}

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
