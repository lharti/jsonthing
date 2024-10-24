import { Button, ButtonProps } from '@/components/ui/Button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/Tooltip'
import { IconLoader, IconProps } from '@tabler/icons-react'
import React from 'react'

export interface DocEditorActionBarBtnProps extends ButtonProps {
    label: string

    Icon: React.ComponentType<IconProps>

    onClick: () => void

    iconOnly?: boolean

    isLoading?: boolean

    isSuccess?: boolean

    isError?: boolean
}

export const DocEditorActionBarBtn: React.FC<DocEditorActionBarBtnProps> = ({
    label,
    Icon,
    variant,

    onClick,

    iconOnly,
    isLoading,

    ...buttonProps
}) => {
    const ButtonIcon = () =>
        isLoading ? (
            <IconLoader className="mr-1 animate-spin" />
        ) : (
            <Icon className="mr-1" />
        )

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={variant || 'ghost'}
                    size="sm"
                    role="button"
                    aria-label={label}
                    onClick={onClick}
                    {...buttonProps}
                >
                    <ButtonIcon />

                    {iconOnly ? '' : label}
                </Button>
            </TooltipTrigger>

            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    )
}
