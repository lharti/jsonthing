import { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,

    experimental: {
        reactCompiler: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/jsonthing-assets/**',
            },
        ],
    },
}

export default nextConfig
