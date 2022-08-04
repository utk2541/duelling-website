/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout:0,
  reactStrictMode: true,
  images: {
    domains: ['cdn-userpic.codeforces.com'],
    unoptimized: true,
  }
}

module.exports = nextConfig
