export const checkDocExists = (id: string) =>
    fetch(
        `${process.env.NEXT_PUBLIC_INT_API_URL}/docs/${id}`,

        {
            method: 'HEAD',
        },
    ).then(res => res.ok)
