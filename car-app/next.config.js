/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.imagin.studio"],
  },
  typescript: {
    ignoreBuilErrors: true,
  },
};

module.exports = nextConfig;
