import { Button } from '@/components/ui/Button'
import { SignUpButton as ClerkSignUnButton } from '@clerk/nextjs'
import React from 'react'

export const SignUpButton: React.FC = () => {
    return (
        <ClerkSignUnButton>
            <Button className="mr-2">{'Sign un'}</Button>
        </ClerkSignUnButton>
    )
}
