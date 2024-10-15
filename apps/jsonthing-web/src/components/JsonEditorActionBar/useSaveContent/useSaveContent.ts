import { useUpdateDoc } from '@/hooks/useUpdateDoc'
import { useEffect, useRef, useState } from 'react'
import { SaveStatus } from '../constants'

interface SavePayload {
    content: string
    id: string
}

interface Options {
    onSuccess?: () => void
    onError?: () => void
}

type UseSaveContent = (
    savePayload: SavePayload,
    options?: Options,
) => {
    save: () => void
    status: SaveStatus
}

export const useSaveContent: UseSaveContent = (
    { content, id },

    options,
) => {
    const [status, setStatus] = useState(SaveStatus.SAVED)

    const { updateDoc } = useUpdateDoc()

    const save = () => {
        setStatus(SaveStatus.PENDING)

        updateDoc(
            {
                id,

                payload: {
                    content,
                },
            },

            {
                onSuccess: () => {
                    setStatus(SaveStatus.SAVED)

                    options?.onSuccess?.()
                },

                onError: () => {
                    setStatus(SaveStatus.IDLE)

                    options?.onError?.()
                },
            },
        )
    }

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false

            return
        }

        setStatus(SaveStatus.IDLE)
    }, [content])

    return {
        save,
        status,
    }
}
