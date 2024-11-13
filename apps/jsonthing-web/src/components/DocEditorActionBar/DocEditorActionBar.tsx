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

    disabled?: boolean
}

export const DocEditorActionBar: React.FC<DocEditorActionBarProps> = ({
    className,

    value,
    docId,

    onChange,

    disabled: actionBarDisabled = false,
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

    const saveButtonLabel = actionBarDisabled
        ? SAVE_BTN_LABELS[SaveStatus.NOT_ALLOWED]
        : SAVE_BTN_LABELS[saveStatus]

    return (
        <div className={cn('flex', className)}>
            <DocEditorActionBarBtn
                iconOnly
                label="Prettify"
                Icon={IconWand}
                disabled={actionBarDisabled}
                onClick={() => prettifyContent()}
            />

            <DocEditorActionBarBtn
                iconOnly
                label="Copy"
                Icon={IconClipboardCopy}
                disabled={actionBarDisabled}
                onClick={() => copyToClipboard()}
            />

            <DocEditorActionBarBtn
                variant="outline"
                Icon={IconDeviceFloppy}
                isLoading={saveStatus === SaveStatus.PENDING}
                disabled={saveStatus !== SaveStatus.IDLE || actionBarDisabled}
                label={saveButtonLabel}
                onClick={() => save()}
            />
        </div>
    )
}
