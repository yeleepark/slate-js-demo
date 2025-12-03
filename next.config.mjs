const normalizeBase = value =>
  value?.trim().replace(/^\/|\/$/g, '') || undefined;
const resolvedBase =
  normalizeBase(process.env.NEXT_PUBLIC_BASE_PATH) ||
  (process.env.NODE_ENV === 'production' ? 'slate-js-demo' : undefined);

const basePath = resolvedBase ? `/${resolvedBase}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

