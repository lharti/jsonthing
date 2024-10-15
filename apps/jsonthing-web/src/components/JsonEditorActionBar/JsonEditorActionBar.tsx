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
import { SAVE_BTN_LABELS, SaveStatus } from './constants'
import { useSaveContent } from './useSaveContent'

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

    const { save, status: saveStatus } = useSaveContent(
        {
            content: editorContent,
            id: id as string,
        },

        {
            onError: () => {
                alert('Failed to save document')
            },
        },
    )

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
                label={SAVE_BTN_LABELS[saveStatus]}
                Icon={IconDeviceFloppy}
                isLoading={saveStatus === SaveStatus.PENDING}
                disabled={saveStatus !== SaveStatus.IDLE}
                onClick={() => save()}
            />
        </div>
    )
}
