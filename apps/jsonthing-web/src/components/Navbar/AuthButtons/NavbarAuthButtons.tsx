import { SignInButton } from '@/components/SignInButton'
import { SignUpButton } from '@/components/SignUpButton'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'

export type NavbarAuthButtonsProps = React.HTMLAttributes<HTMLDivElement>

export const NavbarAuthButtons: React.FC<
    NavbarAuthButtonsProps
> = divAttributes => {
    return (
        <div {...divAttributes} id="auth-buttons-container">
            <SignedOut>
                <SignInButton className="mr-4" />
                <SignUpButton />
            </SignedOut>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}
