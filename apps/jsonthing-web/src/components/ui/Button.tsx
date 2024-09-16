import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
    `
      inline-flex items-center justify-center whitespace-nowrap rounded-md
      text-sm font-medium transition-colors

      dark:focus-visible:ring-gray-300

      disabled:pointer-events-none disabled:opacity-50

      focus-visible:outline-none focus-visible:ring-1
      focus-visible:ring-gray-950
    `,
    {
        variants: {
            variant: {
                default: `
                  bg-gray-900 text-gray-50 shadow

                  dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90

                  hover:bg-gray-900/90
                `,
                destructive: `
                  bg-red-500 text-gray-50 shadow-sm

                  dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90

                  hover:bg-red-500/90
                `,
                outline: `
                  border border-gray-200 bg-white shadow-sm

                  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800
                  dark:hover:text-gray-50

                  hover:bg-gray-100 hover:text-gray-900
                `,
                secondary: `
                  bg-gray-100 text-gray-900 shadow-sm

                  dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80

                  hover:bg-gray-100/80
                `,
                ghost: `
                  dark:hover:bg-gray-800 dark:hover:text-gray-50

                  hover:bg-gray-100 hover:text-gray-900
                `,
                link: `
                  text-gray-900 underline-offset-4

                  dark:text-gray-50

                  hover:underline
                `,
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    readonly asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
