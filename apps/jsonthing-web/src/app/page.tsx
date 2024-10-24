import { DocEditor } from '@/components/DocEditor'
import React from 'react'

const Home: React.FC = () => {
    const initialContent = JSON.stringify(
        {
            JsonThing: '🚀 in progress JSON thing',
            features: [
                '⚡ JSON thing this',
                '💻 JSON thing that',
                '🧪 JSON thing everything',
            ],
        },
        null,
        2,
    )

    return (
        <div className="mt-8">
            <DocEditor initialContent={initialContent} />
        </div>
    )
}

export default Home
