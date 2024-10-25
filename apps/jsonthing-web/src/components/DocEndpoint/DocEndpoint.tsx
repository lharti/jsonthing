import { Button } from '@/components/ui/Button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/Tooltip'
import { cn } from '@/lib/utils'
import { IconApi, IconClipboardCopy } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

export interface DocEndpointProps {
    docId: string
    className?: string
}

export const DocEndpoint: React.FC<DocEndpointProps> = ({
    docId,
    className,
}) => {
    const docEndpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/docs/${docId}`

    return (
        <div className={cn('flex items-center', className)}>
            <p className="mr-3 rounded-sm bg-green-500 p-1 text-white">
                <IconApi />
            </p>

            <Link
                href={docEndpointUrl}
                target="_blank"
                className={`
                  mr-3 overflow-hidden text-ellipsis text-sm font-bold
                  text-gray-400
                `}
            >
                {docEndpointUrl}
            </Link>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        role="button"
                        aria-label="Copy endpoint URL"
                        className="text-gray-600"
                        onClick={() => {
                            navigator.clipboard.writeText(docEndpointUrl)
                        }}
                    >
                        <IconClipboardCopy />
                    </Button>
                </TooltipTrigger>

                <TooltipContent side="bottom">
                    {'Copy endpoint URL'}
                </TooltipContent>
            </Tooltip>
        </div>
    )
}
