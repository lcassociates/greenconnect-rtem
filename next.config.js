/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // ← this replaces "next export"
  images: { unoptimized: true },
};

export default nextConfig;
