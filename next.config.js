/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // 👈 replaces "next export"
  images: {
    unoptimized: true, // 👈 required for static export to handle images
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
