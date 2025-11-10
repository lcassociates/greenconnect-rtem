/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure strict mode is enabled for modern React behavior
  reactStrictMode: true,
  
  // NOTE: The 'reactCompiler: true' option has been removed 
  // because it is highly experimental and may be causing build failures or layout issues.
};

export default nextConfig;