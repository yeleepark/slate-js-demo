/** @type {import('next').NextConfig} */
const repoBase = process.env.NEXT_PUBLIC_REPO_BASE?.trim();
const basePath = repoBase ? `/${repoBase.replace(/^\/|\/$/g, '')}` : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath && {
    basePath,
    assetPrefix: basePath,
  }),
};

export default nextConfig;
