import { Button, ButtonProps } from '@/components/ui/Button'
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'
import React from 'react'

export const SignInButton: React.FC<ButtonProps> = props => {
    return (
        <ClerkSignInButton>
            <Button variant="ghost" {...props}>
                {'Sign in'}
            </Button>
        </ClerkSignInButton>
    )
}
