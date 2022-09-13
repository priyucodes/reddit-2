/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['links.papareact.com', 'logos-world.net', 'avatars.dicebear.com'],
  },
};

module.exports = nextConfig;
