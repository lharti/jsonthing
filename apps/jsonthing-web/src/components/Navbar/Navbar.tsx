import React from 'react'
import { NavbarAuthButtons } from './AuthButtons'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-[1px]">
            <div className="container mx-auto flex max-w-screen-xl p-4">
                <NavbarAuthButtons className="ml-auto" />
            </div>
        </header>
    )
}
