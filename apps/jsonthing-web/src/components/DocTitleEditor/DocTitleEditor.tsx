import { EditableHeading } from '@/components/ui/EditableHeading'
import { useUpdateDoc } from '@/hooks/useUpdateDoc'
import React from 'react'

export interface DocTitleEditorProps {
    initialTitle: string

    docId: string
}

export const DocTitleEditor: React.FC<DocTitleEditorProps> = ({
    initialTitle,
    docId,
}) => {
    const { updateDoc } = useUpdateDoc()

    const updateTitle = (newTitle: string) => {
        updateDoc({
            id: docId,

            payload: {
                title: newTitle,
            },
        })
    }

    return (
        <EditableHeading
            initialValue={initialTitle}
            onChange={newValue => updateTitle(newValue)}
        />
    )
}
