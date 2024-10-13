import { useUpdateDoc } from '@/hooks/useUpdateDoc'
import { prettifyJson } from '@/lib/prettify-json'
import { cn } from '@/lib/utils'
import {
    IconClipboardCopy,
    IconDeviceFloppy,
    IconWand,
} from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { JsonEditorActionBarBtn } from './ActionBarBtn'

export interface JsonEditorActionBarProps {
    className?: string

    editorContent: string
    setEditorContent: React.Dispatch<React.SetStateAction<string>>
}

export const JsonEditorActionBar: React.FC<JsonEditorActionBarProps> = ({
    className,

    editorContent,
    setEditorContent,
}) => {
    const prettifyContent = () => {
        setEditorContent(prettifyJson(editorContent))
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(editorContent)
    }

    const { id } = useParams()

    const { updateDoc } = useUpdateDoc()

    const save = () => {
        updateDoc({
            id: id as string,

            payload: {
                content: editorContent,
            },
        })
    }

    return (
        <div className={cn('flex', className)}>
            <JsonEditorActionBarBtn
                iconOnly
                label="Prettify"
                Icon={IconWand}
                onClick={() => prettifyContent()}
            />

            <JsonEditorActionBarBtn
                iconOnly
                label="Copy"
                Icon={IconClipboardCopy}
                onClick={() => copyToClipboard()}
            />
            <JsonEditorActionBarBtn
                variant="outline"
                label="Save"
                Icon={IconDeviceFloppy}
                onClick={() => save()}
            />
        </div>
    )
}
