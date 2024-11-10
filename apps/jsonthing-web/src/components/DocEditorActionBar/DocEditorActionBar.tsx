import { prettifyJson } from '@/lib/prettify-json'
import { cn } from '@/lib/utils'
import {
    IconClipboardCopy,
    IconDeviceFloppy,
    IconWand,
} from '@tabler/icons-react'
import React from 'react'
import { DocEditorActionBarBtn } from './ActionBarBtn'
import { SAVE_BTN_LABELS, SaveStatus } from './constants'
import { useSaveContent } from './useSaveContent'

export interface DocEditorActionBarProps {
    className?: string

    value: string
    docId: string

    onChange: (newContentValue: string) => void
}

export const DocEditorActionBar: React.FC<DocEditorActionBarProps> = ({
    className,

    value,
    docId,

    onChange,
}) => {
    const prettifyContent = () => {
        const newContentValue = prettifyJson(value)

        onChange(newContentValue)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value)
    }

    const { save, status: saveStatus } = useSaveContent(
        {
            content: value,
            id: docId,
        },

        {
            onError: () => {
                alert('Failed to save document')
            },
        },
    )

    return (
        <div className={cn('flex', className)}>
            <DocEditorActionBarBtn
                iconOnly
                label="Prettify"
                Icon={IconWand}
                onClick={() => prettifyContent()}
            />

            <DocEditorActionBarBtn
                iconOnly
                label="Copy"
                Icon={IconClipboardCopy}
                onClick={() => copyToClipboard()}
            />

            <DocEditorActionBarBtn
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
