import { SignInButton } from '@/components/SignInButton'
import { SignUpButton } from '@/components/SignUpButton'
import React from 'react'

export type NavbarAuthButtonsProps = React.HTMLAttributes<HTMLDivElement>

export const NavbarAuthButtons: React.FC<
    NavbarAuthButtonsProps
> = divAttributes => {
    return (
        <div {...divAttributes} id="auth-buttons-container">
            <SignInButton className="mr-4" />
            <SignUpButton />
        </div>
    )
}
