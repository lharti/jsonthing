'use client'

import { Button } from '@/components/ui/Button'
import { useCreateDoc } from '@/hooks/useCreateDoc'
import { useRouter } from 'next/navigation'
import React from 'react'

export const CreateNewDocButton: React.FC = () => {
    const { createDoc } = useCreateDoc()

    const router = useRouter()

    return (
        <Button
            className="my-3 ml-auto"
            onClick={() => {
                createDoc(undefined, {
                    onSuccess: ({ data }) => {
                        router.push(`/docs/${data._id}`)
                    },
                })
            }}
        >
            {'New Doc'}
        </Button>
    )
}
