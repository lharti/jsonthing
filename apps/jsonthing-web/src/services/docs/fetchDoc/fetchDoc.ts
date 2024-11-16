'use server'

import { Doc } from '@/types/doc.types'

export const fetchDoc = async (id: string): Promise<Doc> => {
    const docUrl = `${process.env.INT_API_URL}/docs/${id}`

    const result = await fetch(docUrl).then(response => response.json())

    return result
}
