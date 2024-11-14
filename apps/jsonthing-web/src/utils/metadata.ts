import type { Metadata } from 'next'

export interface MetadataParams {
    title: string
    description: string
    url: string
    imageUrl: string
    imageAlt: string
    siteName: string
}

export function generateMetadata({
    title,
    description,
    url,
    imageUrl,
    imageAlt,
    siteName,
}: MetadataParams): Metadata {
    return {
        title,
        description,

        openGraph: {
            type: 'website',
            url,
            title,
            description,

            siteName,

            images: [
                {
                    url: imageUrl,
                    alt: imageAlt,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },

        robots: 'index, follow',
    }
}
