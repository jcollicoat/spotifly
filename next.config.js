/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['i.scdn.co', 'platform-lookaside.fbsbx.com'],
    },
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = nextConfig;
