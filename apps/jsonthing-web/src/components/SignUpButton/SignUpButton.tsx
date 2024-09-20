import { Button, ButtonProps } from '@/components/ui/Button'
import { SignUpButton as ClerkSignUnButton } from '@clerk/nextjs'
import React from 'react'

export const SignUpButton: React.FC<ButtonProps> = props => {
    return (
        <ClerkSignUnButton>
            <Button {...props}>{'Sign up'}</Button>
        </ClerkSignUnButton>
    )
}
