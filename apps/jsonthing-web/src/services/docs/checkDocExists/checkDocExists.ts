'use server'

export const checkDocExists = async (id: string) => {
    const result = await fetch(
        `${process.env.INT_API_URL}/docs/${id}`,

        {
            method: 'HEAD',
        },
    )

    return result.ok
}
