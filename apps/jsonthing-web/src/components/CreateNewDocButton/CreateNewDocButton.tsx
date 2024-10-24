'use client'

import { Button, ButtonProps } from '@/components/ui/Button'
import { useCreateDoc } from '@/hooks/useCreateDoc'
import { useRouter } from 'next/navigation'
import React from 'react'

type CreateNewDocButtonProps = ButtonProps

export const CreateNewDocButton: React.FC<CreateNewDocButtonProps> = ({
    ...buttonProps
}) => {
    const { createDoc } = useCreateDoc()

    const router = useRouter()

    return (
        <Button
            onClick={() => {
                createDoc(undefined, {
                    onSuccess: ({ data }) => {
                        router.push(`/docs/${data._id}`)
                    },
                })
            }}
            {...buttonProps}
        >
            {'New Doc'}
        </Button>
    )
}
