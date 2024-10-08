import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import React, { PropsWithChildren } from 'react'

const DocLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="container mx-auto max-w-screen-md">
            <div className="mb-12 flex">
                <CreateNewDocButton />
            </div>

            {children}
        </div>
    )
}

export default DocLayout
