import { CreateNewDocButton } from '@/components/CreateNewDocButton'
import Link from 'next/link'
import React from 'react'

const DocNotFound = () => {
    return (
        <main className="mx-4 flex h-screen flex-col items-center justify-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-600">
                {'Doc Not Found'}
            </h1>

            <CreateNewDocButton className="mb-6">
                {'CREATE NEW DOC'}
            </CreateNewDocButton>

            <Link
                href="/"
                className={`
                  text-blue-500

                  hover:underline
                `}
            >
                {'Return Home'}
            </Link>
        </main>
    )
}

export default DocNotFound
