'use client'

import { Button, ButtonProps } from '@/components/ui/Button'
import { useCreateDoc } from '@/hooks/useCreateDoc'
import React from 'react'
import { Doc } from 'types/doc.types'

interface CreateNewDocButtonProps extends ButtonProps {
    onPending?: () => void
    onSuccess?: (newDoc: Doc) => void
    onError?: () => void
}

export const CreateNewDocButton: React.FC<CreateNewDocButtonProps> = ({
    onPending,
    onSuccess,
    onError,

    ...buttonProps
}) => {
    const { createDoc, isPending } = useCreateDoc()

    const handleCreateDoc = () => {
        onPending?.()

        createDoc(undefined, {
            onSuccess: ({ data }) => {
                onSuccess?.(data)
            },

            onError: () => {
                onError?.()
            },
        })
    }
    return (
        <Button onClick={handleCreateDoc} {...buttonProps} disabled={isPending}>
            {'New Doc'}
        </Button>
    )
}
