import { Button } from '@/components/ui/Button'
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'
import React from 'react'

export const SignInButton: React.FC = () => {
    return (
        <ClerkSignInButton>
            <Button className="mr-2" variant="ghost">
                {'Sign in'}
            </Button>
        </ClerkSignInButton>
    )
}
