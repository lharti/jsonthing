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

    const savedContent = useRef(content)

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

                    savedContent.current = content

                    options?.onSuccess?.()
                },

                onError: () => {
                    setStatus(SaveStatus.IDLE)

                    options?.onError?.()
                },
            },
        )
    }

    useEffect(() => {
        if (savedContent.current === content) {
            setStatus(SaveStatus.SAVED)
        } else {
            setStatus(SaveStatus.IDLE)
        }
    }, [content])

    return {
        save,
        status,
    }
}
