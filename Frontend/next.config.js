/* @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout:0,
  reactStrictMode: true,
  images: {
    domains: ['userpic.codeforces.org'],
    unoptimized: true,
  }
}

module.exports = nextConfig
