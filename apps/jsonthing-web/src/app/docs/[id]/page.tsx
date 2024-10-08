import { JsonEditor } from '@/components/JsonEditor'
import React from 'react'

const Doc = () => {
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
        <div>
            <JsonEditor initialContent={initialContent} />
        </div>
    )
}

export default Doc
