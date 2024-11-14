import { generateMetadata, MetadataParams } from './metadata'

describe('generateMetadata', () => {
    it('should generate metadata', () => {
        expect.assertions(1)

        const params: MetadataParams = {
            title: 'Test Title',
            description: 'Test Description',
            url: 'https://jsonthing.com',
            imageUrl: 'https://assets.jsonthing.com/image.png',
            imageAlt: 'Test Image Alt',
            siteName: 'Jsonthing',
        }

        const metadata = generateMetadata(params)

        expect(metadata).toMatchInlineSnapshot(`
            {
              "description": "Test Description",
              "openGraph": {
                "description": "Test Description",
                "images": [
                  {
                    "alt": "Test Image Alt",
                    "url": "https://assets.jsonthing.com/image.png",
                  },
                ],
                "siteName": "Jsonthing",
                "title": "Test Title",
                "type": "website",
                "url": "https://jsonthing.com",
              },
              "robots": "index, follow",
              "title": "Test Title",
              "twitter": {
                "card": "summary_large_image",
                "description": "Test Description",
                "images": [
                  "https://assets.jsonthing.com/image.png",
                ],
                "title": "Test Title",
              },
            }
        `)
    })
})
