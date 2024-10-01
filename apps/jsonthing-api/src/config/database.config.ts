export interface DatabaseConfig {
    uri: string
    name: string
}

export const databaseConfig = (): DatabaseConfig => ({
    uri: process.env.DB_URI || '',
    name: process.env.DB_NAME || '',
})
