import { cn } from '@/lib/utils'
import React from 'react'

const Skeleton = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                `
                  animate-pulse rounded-md bg-gray-900/10

                  dark:bg-gray-50/10
                `,
                className,
            )}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    )
}

export { Skeleton }
