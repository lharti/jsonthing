export const prettifyJson = (json: string): string => {
    return JSON.stringify(JSON.parse(json), null, 2)
}
