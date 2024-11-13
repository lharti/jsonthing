import { Button } from '@/components/ui/Button'
import { IconCheck, IconPencil } from '@tabler/icons-react'
import React, { useEffect, useRef } from 'react'

export enum UIMode {
    VIEW = 'view',
    EDIT = 'edit',
}

export interface EditableHeadingProps {
    initialValue: string
    onChange?: (newValue: string) => void

    initialUIMode?: UIMode
}

export const EditableHeading: React.FC<EditableHeadingProps> = ({
    initialValue,
    onChange,

    initialUIMode = UIMode.VIEW,
}) => {
    const [uiMode, setUIMode] = React.useState(initialUIMode)

    const headingElemRef = useRef<HTMLHeadingElement>(null)

    const handleValueChange = () => {
        const newValue = headingElemRef.current?.textContent as string

        if (newValue === initialValue) return

        onChange?.(newValue)
    }

    const handleEnterKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()

            setUIMode(UIMode.VIEW)

            handleValueChange()
        }
    }

    useEffect(() => {
        if (uiMode === UIMode.EDIT) {
            headingElemRef.current?.focus()
        } else {
            headingElemRef.current?.blur()
        }
    }, [uiMode])

    const isEditMode = uiMode === UIMode.EDIT

    return (
        <div className="inline-flex">
            <h1
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                ref={headingElemRef}
                role={isEditMode ? 'input' : 'heading'}
                className={`
                  cursor-pointer text-3xl font-bold outline outline-2
                  outline-transparent

                  focus:cursor-auto focus:rounded-sm focus:outline-blue-300
                `}
                onKeyDown={handleEnterKeyPress}
                onFocus={() => setUIMode(UIMode.EDIT)}
            >
                {initialValue}
            </h1>

            <Button
                className="ml-2 p-1"
                variant={isEditMode ? 'outline' : 'ghost'}
                role="button"
                aria-label="edit title"
                onClick={() => {
                    if (isEditMode) {
                        handleValueChange()

                        setUIMode(UIMode.VIEW)
                    } else setUIMode(UIMode.EDIT)
                }}
            >
                {isEditMode ? <IconCheck /> : <IconPencil />}
            </Button>
        </div>
    )
}
