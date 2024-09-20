---
to: "src/components/<%= path ? path + '/' : '' %><%= name %>/<%= name %>.tsx"
---
import React from 'react'

export interface <%= name %>Props {
    title: string
}

export const <%= name %>: React.FC<<%= name %>Props> = ({ title }) => {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

