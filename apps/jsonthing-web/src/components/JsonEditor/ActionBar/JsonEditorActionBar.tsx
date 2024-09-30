import { prettifyJson } from '@/lib/prettify-json'
import { cn } from '@/lib/utils'
import {
    IconClipboardCopy,
    IconDeviceFloppy,
    IconWand,
} from '@tabler/icons-react'
import React from 'react'
import { JsonEditorActionBarBtn } from '../ActionBarBtn'

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
    const handlePrettify = () => {
        setEditorContent(prettifyJson(editorContent))
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(editorContent)
    }

    return (
        <div className={cn('flex', className)}>
            <JsonEditorActionBarBtn
                iconOnly
                label="Prettify"
                Icon={IconWand}
                onClick={handlePrettify}
            />

            <JsonEditorActionBarBtn
                iconOnly
                label="Copy"
                Icon={IconClipboardCopy}
                onClick={handleCopyToClipboard}
            />
            <JsonEditorActionBarBtn
                variant="outline"
                label="Save"
                Icon={IconDeviceFloppy}
                onClick={handleCopyToClipboard}
            />
        </div>
    )
}
