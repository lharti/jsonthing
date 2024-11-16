import { Metadata } from 'next'
import React, { PropsWithChildren } from 'react'

export const metadata: Metadata = {
    title: 'Doc',
}

const DocLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return <>{children}</>
}

export default DocLayout
