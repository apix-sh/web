import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
      {
        source: '/install',
        destination:
          'https://raw.githubusercontent.com/apix-sh/cli/main/scripts/install.sh',
      },
    ];
  },
};

export default withMDX(config);
