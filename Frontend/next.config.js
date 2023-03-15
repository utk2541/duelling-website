/* @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout:10,
  reactStrictMode: true,
  images: {
    domains: ['userpic.codeforces.org'],
    unoptimized: true,
  }
}

module.exports = nextConfig
