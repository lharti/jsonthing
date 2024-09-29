import { Button } from '@/components/ui/Button'
import { prettifyJson } from '@/lib/prettify-json'
import React from 'react'

export interface JsonEditorActionBarProps {
    className?: string

    editorContent: string
    setEditorContent: (value: string) => void
}

export const JsonEditorActionBar: React.FC<JsonEditorActionBarProps> = ({
    className,

    editorContent,
    setEditorContent,
}) => {
    return (
        <div className={className}>
            <Button
                variant="outline"
                className="my-2 h-6 rounded-none bg-transparent p-0 px-2"
                onClick={() => {
                    const prettyEditorContent = prettifyJson(editorContent)

                    setEditorContent(prettyEditorContent)
                }}
            >
                {'Prettify'}
            </Button>
        </div>
    )
}
