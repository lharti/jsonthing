'use client'

import { Button, ButtonProps } from '@/components/ui/Button'
import { useCreateDoc } from '@/hooks/useCreateDoc'
import { Doc } from '@/types/doc.types'
import { useRouter } from 'next/navigation'
import React from 'react'

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

    const router = useRouter()
    const handleCreateDoc = () => {
        onPending?.()

        createDoc(undefined, {
            onSuccess: ({ data }) => {
                onSuccess?.(data)

                router.push(`/docs/${data.id}`)
            },

            onError: () => {
                onError?.()
            },
        })
    }
    return (
        <Button
            disabled={isPending}
            onClick={handleCreateDoc}
            {...buttonProps}
        />
    )
}
