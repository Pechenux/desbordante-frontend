/* eslint-disable @typescript-eslint/no-require-imports */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        isDevelopment: String(dev),
      }),
    );
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
