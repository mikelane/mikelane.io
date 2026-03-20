import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/dioxide/:path*",
        destination: "https://mikelane.github.io/dioxide/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
