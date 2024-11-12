export const DEFAULT_DOC_TITLE_CANDIDATES = [
    'Add Your Touch',
    'Make Me Yours',
    'Do Your Thing',
    'Edit me',
    'Modify me',
    'Change It Up',
    'Untitled',
]

export function getRandomDefaultTitle(): string {
    const randomIndex = Math.floor(
        Math.random() * DEFAULT_DOC_TITLE_CANDIDATES.length,
    )

    return DEFAULT_DOC_TITLE_CANDIDATES[randomIndex]
}

export const DEFAULT_DOC_CONTENT = {
    tagline: 'JSON Made Easy',
    about: 'Edit JSON, get an API instantly. No hassle.',
    perks: 'Zero setup. Just JSON.',
}

export enum DocType {
    JSON = 'json',
}
