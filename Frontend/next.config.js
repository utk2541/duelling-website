/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn-userpic.codeforces.com'],
    unoptimized: true,
  }
}

module.exports = nextConfig
