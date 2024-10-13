import { Button, ButtonProps } from '@/components/ui/Button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/Tooltip'
import { IconProps } from '@tabler/icons-react'
import React from 'react'

export interface JsonEditorActionBarBtnProps extends ButtonProps {
    label: string

    Icon: React.ComponentType<IconProps>

    onClick: () => void

    iconOnly?: boolean
}

export const JsonEditorActionBarBtn: React.FC<JsonEditorActionBarBtnProps> = ({
    label,
    Icon,

    onClick,

    iconOnly,
    ...buttonProps
}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    role="button"
                    aria-label={label}
                    onClick={onClick}
                    {...buttonProps}
                >
                    <Icon className="mr-1" />
                    {iconOnly ? '' : label}
                </Button>
            </TooltipTrigger>

            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    )
}
